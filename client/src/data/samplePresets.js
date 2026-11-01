// Sample presets for instant testing without camera or mic
export const samplePresets = [
  {
    id: "sunflower-bandana",
    title_ur: "سن فلاور کروشیا بینڈانا",
    title_en: "Sunflower Crochet Bandana",
    category: "کروشیا (Crochet)",
    userQuery_ur: "بیٹا، اس بینڈانا کے لیے کتنی اون لگے گی اور پھولوں کے لیے کتنے گولے چاہیے؟",
    userQuery_en: "How much yarn is needed for this bandana and how many skeins for the sunflowers?",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    blueprint: {
      title_ur: "سن فلاور گرینی اسکوائر کروشیا بینڈانا",
      title_en: "Sunflower Granny Square Crochet Bandana",
      craft_type: "Crochet",
      summary_ur: "باجی، اس خوبصورت سن فلاور بینڈانا کے لیے کل 120 سے 140 گرام اون درکار ہوگی۔ یہ تین رنگوں کے ملاپ سے بنتا ہے۔",
      summary_en: "For this sunflower bandana, approximately 120-140 grams of DK acrylic/cotton yarn is needed across 3 colors.",
      material_estimate: {
        primary_material: "آف وائٹ / کریم رنگ کی اون (بیس اور بارڈر)",
        total_yardage: "70 گرام (تقریباً 160 میٹر)",
        width_requirement: "3.5 ملی میٹر کروشیا ہک (Gauge: 4-ply / DK weight)",
        secondary_materials: [
          "براؤن یا چاکلیٹ اون (پھول کا درمیانی حصہ): 25 گرام",
          "گولڈن یلو یا مسٹرڈ اون (پنکھڑیاں): 35 گرام",
          "اون والی موٹی سوئی (Tapestry Needle)"
        ],
        wastage_buffer_percent: 10
      },
      cut_list: [
        {
          piece_name_ur: "مکمل سن فلاور گرینی اسکوائرز",
          piece_name_en: "Full Sunflower Granny Squares",
          quantity: 8,
          dimensions: "8 x 8 سینٹی میٹر (ہر مربع)",
          cut_type: "گرینی مربع",
          notes: "ہر مربعے میں 3 راؤنڈز ہوں گے: براؤن سینٹر، پیلی پنکھڑیاں، اور آف وائٹ باؤنڈری"
        },
        {
          piece_name_ur: "آدھے تکونے اسکوائرز (کناروں کے لیے)",
          piece_name_en: "Half-Triangle Squares",
          quantity: 2,
          dimensions: "8 x 8 x 11 سینٹی میٹر",
          cut_type: "تکون گرینی",
          notes: "بینڈانا کے دونوں سائیڈ کنارے سیدھے کرنے کے لیے"
        },
        {
          piece_name_ur: "باندھنے والی ڈوریاں (سٹرنگز)",
          piece_name_en: "Tie Strings",
          quantity: 2,
          dimensions: "30 سینٹی میٹر لمبائی (55 چینز)",
          cut_type: "سنگل کروشیا پٹی",
          notes: "سر کے پیچھے باندھنے کے لیے دونوں کونوں پر جوڑیں"
        }
      ],
      assembly_steps: [
        {
          step_number: 1,
          instruction_ur: "براؤن اون سے میجک رنگ بنا کر 16 ڈبل کروشیا بنائیں، پھر یلو اون سے 16 پف / پاپ کارن اسٹچ سے پنکھڑیاں مکمل کریں۔",
          instruction_en: "Work magic ring with brown yarn, 16 double crochets. Attach mustard yarn for 16 puff stitches.",
          visual_diagram_prompt_en: "Vector schematic of crochet magic circle with 16 double stitches in brown center and mustard yellow puff petals surrounding it",
          tip: "پنکھڑیاں بناتے ہوئے ہاتھ زیادہ کسا ہوا نہ رکھیں ورنہ مربع ٹیڑھا ہو جائے گا۔"
        },
        {
          step_number: 2,
          instruction_ur: "آف وائٹ اون سے کونے بناتے ہوئے تمام 8 اسکوائرز اور 2 ٹرائینگلز تیار کر کے ہلکی بھاپ سے پریس (Block) کر لیں۔",
          instruction_en: "Frame squares with off-white yarn into squares and triangles. Steam block lightly.",
          visual_diagram_prompt_en: "Technical line diagram showing 8 square crochet motifs arranged in a diagonal triangle bandana grid with 2 half triangles on edges",
          tip: "جوڑنے سے پہلے بلاک کرنے سے بینڈانا کی شیپ پرفیکٹ بیٹھتی ہے۔"
        },
        {
          step_number: 3,
          instruction_ur: "تمام اسکوائرز کو تکون شکل میں سلپ اسٹچ سے آپس میں جوڑیں اور ماتھے والے کنارے پر سنگل کروشیا کا فائنل بارڈر دیں۔",
          instruction_en: "Join squares in triangle formation using slip stitch and add clean single crochet edge.",
          visual_diagram_prompt_en: "Crochet join diagram with dotted arrows indicating slip stitch seaming between square motifs and strap placement at both side tips",
          tip: "سٹرنگز کے سرے پر چھوٹی گرہ لگائیں تاکہ دھاگہ نہ کھلے۔"
        }
      ],
      speech_script_ur: "باجی، اس سن فلاور بینڈانا کے لیے کل ایک سو بیس سے چالیس گرام اون لگے گی۔ ستر گرام آف وائٹ، پینتیس گرام مسٹرڈ یلو، اور پچیس گرام براؤن اون درکار ہے۔ آپ کو کل آٹھ چوکور اسکوائر اور دو تکون بنانے ہوں گے۔ جوڑنے سے پہلے ہلکی بھاپ ضرور لگائیں تاکہ کناروں میں صفائی آئے۔"
    }
  },
  {
    id: "denim-patchwork-laptop-bag",
    title_ur: "زیرو ویسٹ ڈینم لیپ ٹاپ بیگ",
    title_en: "Zero-Waste Patchwork Denim Laptop Sleeve",
    category: "زیرو ویسٹ سلائی (Upcycling)",
    userQuery_ur: "استاد جی، پرانی جینز کے ٹکڑوں سے 13x9 انچ لیپ ٹاپ بیگ بنانا ہے، 8 سینٹی میٹر کے کتنے چوکور کاٹیں؟",
    userQuery_en: "Master tailor, making a 13x9 laptop bag from old jeans scraps. How many 8cm squares do I need?",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    blueprint: {
      title_ur: "زیرو ویسٹ ڈینم پیچ ورک لیپ ٹاپ سلیو (13x9 انچ)",
      title_en: "Zero-Waste Denim Patchwork Laptop Sleeve (13x9 Inch)",
      craft_type: "Upcycling & Sewing",
      summary_ur: "استاد جی، 13 ضرب 9 انچ کے لیپ ٹاپ اور آدھے انچ کی سلائی مارجن کے ساتھ، آپ کو 8x8 سینٹی میٹر کے کل 30 چوکور ٹکڑے درکار ہوں گے۔",
      summary_en: "For a 13x9 inch laptop sleeve with 0.5-inch seam margins, you will need 30 denim squares of 8x8 cm (15 front, 15 back).",
      material_estimate: {
        primary_material: "پرانی جینز کی پینٹس سے کٹے ہوئے ٹکڑے (ہلکا اور گہرا شیڈ)",
        total_yardage: "تقریباً 1 پرانی جینز کی ٹانگیں (Leg pieces)",
        width_requirement: "14 x 10 انچ مکمل تیار کٹنگ ایریا",
        secondary_materials: [
          "فوم یا پرانا کمبل (پیڈنگ / Cushioning): 14 x 20 انچ کا ایک ٹکڑا",
          "اندر کا استر (Cotton/Poplin Lining): آدھا گز (0.5 Gaz)",
          "14 انچ وزنی نائلون زپ (Heavy Duty Zipper)",
          "ڈینم سائز 16/100 سوئی (Heavy sewing needle)"
        ],
        wastage_buffer_percent: 5
      },
      cut_list: [
        {
          piece_name_ur: "ڈینم کے چوکور پیچز (سامنے اور پیچھے)",
          piece_name_en: "Denim Patchwork Squares",
          quantity: 30,
          dimensions: "8 x 8 سینٹی میٹر (3.15 x 3.15 انچ)",
          cut_type: "سیدھی کٹنگ (Straight cut)",
          notes: "سامنے کے پینل کے لیے 15 اور پچھلے پینل کے لیے 15 ٹکڑے (5 چوڑائی x 3 لمبائی کی گرڈ)"
        },
        {
          piece_name_ur: "اندرونی کشن فوم (Quilting Foam)",
          piece_name_en: "Protective Foam Core",
          quantity: 2,
          dimensions: "14 x 10.5 انچ",
          cut_type: "سیدھا ٹکڑا",
          notes: "لیپ ٹاپ کی حفاظت کے لیے دونوں پینلز کے نیچے لگے گا"
        },
        {
          piece_name_ur: "سوتی استر (Cotton Lining)",
          piece_name_en: "Inner Lining",
          quantity: 2,
          dimensions: "14 x 10.5 انچ",
          cut_type: "سیدھا کپڑا",
          notes: "اندرونی فائنل فنشنگ کے لیے"
        }
      ],
      assembly_steps: [
        {
          step_number: 1,
          instruction_ur: "تمام 30 ڈینم چوکوروں کو ڈارک اور لائٹ ترتیب میں 5 کالم اور 3 قطاروں کی گرڈ میں رکھیں، پھر قطار وار جوڑ لیں۔",
          instruction_en: "Arrange denim squares in light/dark pattern (5 columns x 3 rows). Stitch into strips then join rows.",
          visual_diagram_prompt_en: "Flat grid layout diagram showing 5x3 grid of denim squares with alternating light and dark blue tones, with horizontal arrows showing row stitching sequence",
          tip: "ہر جوڑ پر درز کو کھول کر استری (Iron) کر لیں تاکہ موٹائی کم ہو سکے۔"
        },
        {
          step_number: 2,
          instruction_ur: "تیار شدہ پیچ ورک کو فوم پر رکھیں اور ڈائمنڈ یا سیدھی لائنوں میں سلائی (Quilting) کر دیں۔",
          instruction_en: "Layer denim panel over foam and quilt with straight or diagonal guidelines.",
          visual_diagram_prompt_en: "Technical sewing cross-section showing patchwork denim on top, foam in middle, lining on bottom, with diagonal dashed quilting lines",
          tip: "سلائی مشین پر 16 نمبر کی سوئی استعمال کریں تاکہ ڈینم کے موٹے جوڑ پر سوئی نہ ٹوٹے۔"
        },
        {
          step_number: 3,
          instruction_ur: "اوپری سرے پر زپ اور اندرونی استر سینڈوچ کر کے سلائی لگائیں اور الٹا کر کے تینوں اطراف بند کر دیں۔",
          instruction_en: "Sandwich zipper between outer quilted panel and lining. Topstitch and seal outer edges.",
          visual_diagram_prompt_en: "Exploded zipper installation diagram showing denim shell, zipper teeth, and lining fabric being pinned together at top edge",
          tip: "زپ کے دونوں کناروں پر کپڑے کی چھوٹی پٹی (Zip tabs) لگانے سے کنارے صاف بنتے ہیں۔"
        }
      ],
      speech_script_ur: "استاد جی، تیرہ ضرب نو انچ کے لیپ ٹاپ کور کے لیے آٹھ سینٹی میٹر کے کل تیس چوکور ٹکڑے کاٹیں۔ پندرہ ٹکڑے آگے کے لیے اور پندرہ پیچھے کے لیے۔ آدھا گز استر اور چودہ انچ کی زپ درکار ہوگی۔ جوڑنے کے بعد سولہ نمبر کی سوئی سے کشن فوم پر کوئلٹنگ کر لیں۔"
    }
  },
  {
    id: "kurti-sleeves-darzi",
    title_ur: "کرتی کی کٹنگ اور آستین کا اضافہ",
    title_en: "A-Line Kurti & Sleeve Extension Cut",
    category: "درزی کٹنگ (Tailoring)",
    userQuery_ur: "باجی، اس قمیض کا کپڑا 2 گز ہے، کیا فل بازو نکل آئیں گے یا جوڑ ڈالنا پڑے گا؟",
    userQuery_en: "Can I get full sleeves from 2 yards of fabric or will I need joint patches?",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    blueprint: {
      title_ur: "اے-لائن کرتی بمعہ ڈیزائنر آستین جوڑ کٹنگ",
      title_en: "A-Line Kurti with Bell Sleeve Extension Cut",
      craft_type: "Garment Sewing",
      summary_ur: "باجی، 40 انچ لمبائی کے ساتھ 2 گز کپڑے میں فل آستین کے لیے آگے 4 انچ کا ڈیزائنر بارڈر یا اریب مگزی جوڑنا بہتر رہے گا، بغیر کسی خرابی کے۔",
      summary_en: "With 2 yards for a 40-inch length kurti, adding a 4-inch contrast cuff/border solves the sleeve fabric limit elegantly.",
      material_estimate: {
        primary_material: "لان یا کاٹن کا پرنٹڈ کپڑا",
        total_yardage: "2 گز (تقریباً 1.8 میٹر)",
        width_requirement: "42 سے 44 انچ عرض (Standard Arz)",
        secondary_materials: [
          "کنٹراسٹ بارڈر یا لیس (Border / Lace): 1.5 گز",
          "گلے کی فیوزنگ پیپر / بکرم: 0.25 گز",
          "میچنگ نلکی (Thread spool)"
        ],
        wastage_buffer_percent: 8
      },
      cut_list: [
        {
          piece_name_ur: "قمیض کا دامن (فرنٹ اور بیک)",
          piece_name_en: "Front and Back Shirt Body",
          quantity: 2,
          dimensions: "40 انچ لمبائی x 24 انچ گھیرا",
          cut_type: "تہہ پر (On fold)",
          notes: "چیسٹ 20 انچ اور دامن 24 انچ پر اے-لائن شیپ دیں"
        },
        {
          piece_name_ur: "آستین کا اوپری حصہ (کندھا تا کہنی)",
          piece_name_en: "Upper Sleeve Portion",
          quantity: 2,
          dimensions: "16 انچ لمبائی x 9 انچ موڈھا",
          cut_type: "سیدھی کٹنگ",
          notes: "کندھے کا گہراؤ 3.5 انچ پر کاٹیں"
        },
        {
          piece_name_ur: "آگے کا کف / ڈیزائنر پٹی (Sleeve Cuff)",
          piece_name_en: "Sleeve Contrast Cuff",
          quantity: 2,
          dimensions: "5 انچ لمبائی x 12 انچ چوڑائی",
          cut_type: "بارڈر کٹنگ",
          notes: "لمبائی پوری کرنے کے لیے لیس کے ساتھ جوڑیں"
        }
      ],
      assembly_steps: [
        {
          step_number: 1,
          instruction_ur: "فرنٹ اور بیک پینل پر گلے کا بکرم چپکا کر پلٹائیں اور کندھے کی سلائی (Shoulder seam) پکی کریں۔",
          instruction_en: "Apply neck interfacing, turn and finish necklines, then join shoulder seams.",
          visual_diagram_prompt_en: "Pattern drafting diagram of shirt neckline facing with iron-on interfacing and shoulder seam stitch line with red marker",
          tip: "کندھے کی سلائی کو بیک سائیڈ پر موڑ کر استری سے بٹھائیں۔"
        },
        {
          step_number: 2,
          instruction_ur: "آستین کے آگے لیس رکھ کر 5 انچ والی ڈیزائنر پٹی جوڑیں تاکہ آستین کی لمبائی پورے 21 انچ ہو جائے۔",
          instruction_en: "Join 5-inch cuff with lace insertion to reach 21-inch total sleeve length.",
          visual_diagram_prompt_en: "Technical sleeve extension blueprint showing upper sleeve panel, lace insertion strip, and lower cuff joining to reach 21 inches total length",
          tip: "جوڑ کو چھپانے کے لیے لیس کا استعمال کریں جس سے ڈیزائن بھی خوبصورت بنے گا۔"
        },
        {
          step_number: 3,
          instruction_ur: "موڈھا قمیض کے ساتھ جوڑیں اور سائیڈ کی فٹنگ سلائی لگا کر نیچے گھیرے کی باریک مگزی موڑ دیں۔",
          instruction_en: "Attach armholes, complete side fitting seams and hem the bottom flare.",
          visual_diagram_prompt_en: "Tailoring blueprint diagram showing armhole curve alignment and side seam chalk lines extending down to curved bottom hem",
          tip: "چاک کے سرے پر دوہری سلائی لگائیں تاکہ اٹھتے بیٹھتے کھنچاؤ سے دھاگہ نہ ٹوٹے۔"
        }
      ],
      speech_script_ur: "باجی، دو گز کپڑے میں چالیس انچ کی قمیض کے ساتھ فل آستین بنانے کے لیے آگے پانچ انچ کا ڈیزائنر کف جوڑیں۔ اس سے آستین کی لمبائی اکیس انچ مکمل ہو جائے گی اور ڈیزائن بھی بہترین لگے گا۔ گلے کے لیے چوتھائی گز بکرم اور ڈیڑھ گز بارڈر لیس درکار ہوگی۔"
    }
  }
];
