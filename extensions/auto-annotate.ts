/**
 * Auto-Annotate Extension - Browser UI Integration
 * 
 * Integrates with @plannotator/pi-extension to provide
 * browser-based annotation UI for complex questions.
 */

import { Type } from "typebox";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";

// Plannotator browser module type (lazy loaded)
type PlannotatorBrowser = typeof import("@plannotator/pi-extension/plannotator-browser.ts");

let browserModule: PlannotatorBrowser | null = null;

async function loadPlannotatorBrowser(): Promise<PlannotatorBrowser> {
  if (browserModule) return browserModule;
  
  try {
    browserModule = await import("@plannotator/pi-extension/plannotator-browser.ts");
    return browserModule;
  } catch (err) {
    throw new Error(
      `Failed to load plannotator browser module. Make sure @plannotator/pi-extension is installed.\n` +
      `Error: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export default function autoAnnotate(pi: ExtensionAPI) {
  console.log("[auto-annotate] Extension loading...");
  
  // Register the open_annotate tool with browser UI integration
  pi.registerTool({
    name: "open_annotate",
    label: "Open Annotation UI",
    description: 
      "Open browser-based annotation UI for complex questions or content review. " +
      "Use this when you need the user to review, annotate, or provide feedback on " +
      "questions, plans, or content in a visual browser interface.",
    parameters: Type.Object({
      title: Type.String({ description: "Title for the annotation session" }),
      content: Type.String({ description: "Content to annotate (markdown format)" }),
      mode: Type.Optional(
        Type.Union([
          Type.Literal("annotate"),
          Type.Literal("annotate-last"),
        ], { 
          description: "Annotation mode: 'annotate' for custom content, 'annotate-last' for last message" 
        })
      ),
    }) as any,
    
    async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
      console.log("[auto-annotate] Tool called with:", params);
      
      const { title, content, mode = "annotate" } = params as { 
        title: string; 
        content: string;
        mode?: "annotate" | "annotate-last";
      };
      
      // Check if UI is available
      if (!ctx.hasUI) {
        return {
          content: [{ 
            type: "text", 
            text: "Annotation UI requires interactive mode (TUI). Current mode does not support browser UI." 
          }],
          details: { error: "no-ui" },
        };
      }
      
      try {
        const browser = await loadPlannotatorBrowser();
        
        // Create a temporary file path for the content
        const tempFilePath = `annotation://${encodeURIComponent(title)}`;
        
        // Notify user that annotation is opening
        ctx.ui.notify(`Opening annotation UI: ${title}`, "info");
        
        // Start the annotation session
        const session = await browser.startMarkdownAnnotationSession(
          ctx,
          tempFilePath,
          content,
          mode,
          undefined, // folderPath
          title,     // sourceInfo
          false,     // sourceConverted
          false,     // gate
        );
        
        ctx.ui.notify(`Annotation UI opened at: ${session.url}`, "info");
        
        // Wait for user decision (approve/deny/annotate)
        const result = await session.waitForDecision();
        
        // Process the result
        if (result.exit) {
          return {
            content: [{ 
              type: "text", 
              text: `Annotation session for "${title}" was closed without decision.` 
            }],
            details: { action: "closed" },
          };
        }
        
        if (result.approved) {
          return {
            content: [{ 
              type: "text", 
              text: `Annotation approved for "${title}".` +
                    (result.feedback ? `\n\nUser notes: ${result.feedback}` : '') 
            }],
            details: { 
              action: "approved",
              feedback: result.feedback,
            },
          };
        }
        
        // Denied with feedback
        return {
          content: [{ 
            type: "text", 
            text: `Annotation denied for "${title}".\n\nUser feedback:\n${result.feedback || "No feedback provided."}` 
          }],
          details: { 
            action: "denied",
            feedback: result.feedback,
          },
        };
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("[auto-annotate] Error:", errorMessage);
        
        return {
          content: [{ 
            type: "text", 
            text: `Failed to open annotation UI: ${errorMessage}` 
          }],
          details: { error: errorMessage },
        };
      }
    },
    
    // Custom rendering for the tool call
    renderCall(args, theme) {
      const title = args.title || "Untitled";
      return new Text(theme.fg("accent", `📝 Opening annotation: ${title}`), 0, 0);
    },
    
    // Custom rendering for the result
    renderResult(result, { expanded }, theme) {
      const action = result.details?.action;
      const feedback = result.details?.feedback;
      let text = "";
      
      if (action === "approved") {
        text = theme.fg("success", "✓ Approved");
        if (feedback && expanded) {
          text += `\n${theme.fg("dim", feedback)}`;
        }
      } else if (action === "denied") {
        text = theme.fg("error", "✗ Denied");
        if (feedback && expanded) {
          text += `\n${theme.fg("warning", feedback)}`;
        }
      } else if (action === "closed") {
        text = theme.fg("muted", "○ Closed");
      } else if (result.details?.error) {
        text = theme.fg("error", `Error: ${result.details.error}`);
      } else {
        text = theme.fg("dim", "Annotation completed");
      }
      
      return new Text(text, 0, 0);
    },
  });

  // Also register a command for manual use
  pi.registerCommand("annotate", {
    description: "Open annotation UI for the last assistant message",
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) {
        ctx.ui.notify("Annotation UI requires interactive mode.", "error");
        return;
      }
      
      try {
        const browser = await loadPlannotatorBrowser();
        
        // Get the last assistant message from session
        const entries = ctx.sessionManager.getEntries();
        let lastMessage = "";
        
        for (let i = entries.length - 1; i >= 0; i--) {
          const entry = entries[i];
          if (entry.type === "message" && entry.message?.role === "assistant") {
            const content = entry.message.content;
            if (typeof content === "string") {
              lastMessage = content;
            } else if (Array.isArray(content)) {
              const textPart = content.find((c: any) => c.type === "text");
              if (textPart && typeof textPart.text === "string") {
                lastMessage = textPart.text;
              }
            }
            break;
          }
        }
        
        if (!lastMessage) {
          ctx.ui.notify("No assistant message found to annotate.", "warning");
          return;
        }
        
        ctx.ui.notify("Opening annotation UI for last message...", "info");
        
        const session = await browser.startLastMessageAnnotationSession(
          ctx,
          lastMessage,
          false, // gate
        );
        
        ctx.ui.notify(`Annotation UI opened at: ${session.url}`, "info");
        
        // Note: Command doesn't wait for decision - user can continue chatting
        // The decision will be handled by plannotator's event system
        
      } catch (err) {
        ctx.ui.notify(
          `Failed to open annotation: ${err instanceof Error ? err.message : String(err)}`,
          "error"
        );
      }
    },
  });

  console.log("[auto-annotate] Extension loaded, tools registered.");
}
