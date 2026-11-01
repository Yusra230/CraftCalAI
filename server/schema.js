import { SchemaType } from "@google/generative-ai";

export const craftBlueprintSchema = {
  type: SchemaType.OBJECT,
  description: "Craft and garment reverse-engineering blueprint with photorealistic visual steps",
  properties: {
    title_ur: {
      type: SchemaType.STRING,
      description: "Descriptive title of the crafted item in Urdu (e.g. سن فلاور کروشیا بینڈانا or پیچ ورک لیپ ٹاپ بیگ)"
    },
    title_en: {
      type: SchemaType.STRING,
      description: "Descriptive title in English"
    },
    summary_ur: {
      type: SchemaType.STRING,
      description: "A respectful, warm message in Urdu addressing the crafter politely (e.g. باجی/استاد جی، اس ڈیزائن کے لیے حساب تیار ہے)"
    },
    summary_en: {
      type: SchemaType.STRING,
      description: "Brief summary in English"
    },
    craft_type: {
      type: SchemaType.STRING,
      description: "Sewing, Crochet, Knitting, Upcycling, or Quilting"
    },
    material_estimate: {
      type: SchemaType.OBJECT,
      description: "Required fabric or yarn breakdown",
      properties: {
        primary_material: {
          type: SchemaType.STRING,
          description: "Main fabric or primary yarn requirement (e.g. کاٹن فیبرک or 4-پلائی اون)"
        },
        total_yardage: {
          type: SchemaType.STRING,
          description: "Total measurement (e.g. 2.5 گز or 150 گرام / 2 گولے)"
        },
        width_requirement: {
          type: SchemaType.STRING,
          description: "Fabric width / arz (e.g. 44 انچ عرض or 58 انچ بڑا عرض)"
        },
        secondary_materials: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "Additional notions like astar (lining), buttons, zipper, or contrast yarn colors"
        },
        wastage_buffer_percent: {
          type: SchemaType.NUMBER,
          description: "Recommended wastage buffer percentage (e.g. 10 or 15)"
        }
      },
      required: ["primary_material", "total_yardage", "secondary_materials"]
    },
    cut_list: {
      type: SchemaType.ARRAY,
      description: "Itemized list of cutting pieces or crochet motifs",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          piece_name_ur: {
            type: SchemaType.STRING,
            description: "Piece name in Urdu (e.g. گھیرا، آستین، فرنٹ پینل، یا 8 سینٹی میٹر کے مربعے)"
          },
          piece_name_en: {
            type: SchemaType.STRING,
            description: "Piece name in English"
          },
          quantity: {
            type: SchemaType.INTEGER,
            description: "Number of pieces to cut"
          },
          dimensions: {
            type: SchemaType.STRING,
            description: "Exact dimensions with seam allowance included (e.g. 9 x 13 انچ or 8 x 8 سینٹی میٹر)"
          },
          cut_type: {
            type: SchemaType.STRING,
            description: "Fold/تہہ پر, Straight grain/سیدھی لکیر, Bias/اریب, or Motif"
          },
          notes: {
            type: SchemaType.STRING,
            description: "Helpful cutting instruction in Urdu"
          }
        },
        required: ["piece_name_ur", "quantity", "dimensions"]
      }
    },
    assembly_steps: {
      type: SchemaType.ARRAY,
      description: "Step-by-step stitching or crochet assembly instructions with photorealistic photographic step prompts",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          step_number: {
            type: SchemaType.INTEGER
          },
          instruction_ur: {
            type: SchemaType.STRING,
            description: "Actionable, simple instruction in clear Urdu"
          },
          instruction_en: {
            type: SchemaType.STRING,
            description: "English translation of the instruction"
          },
          visual_diagram_prompt_en: {
            type: SchemaType.STRING,
            description: "Detailed description of the physical hands-on crafting action suitable for generating a photorealistic close-up photo of a South Asian woman's hands working on fabric or yarn with scissors, measuring tape, and pins on a wooden tailoring table."
          },
          tip: {
            type: SchemaType.STRING,
            description: "Darzi pro-tip or caution for precision"
          }
        },
        required: ["step_number", "instruction_ur", "visual_diagram_prompt_en"]
      }
    },
    speech_script_ur: {
      type: SchemaType.STRING,
      description: "A natural, cohesive spoken Urdu audio script for text-to-speech reading out total yardage, key pieces to cut, and top tip directly to the crafter."
    }
  },
  required: [
    "title_ur",
    "summary_ur",
    "craft_type",
    "material_estimate",
    "cut_list",
    "assembly_steps",
    "speech_script_ur"
  ]
};
