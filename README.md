# Executive Roundtable — Landing Page + Registration

## 🚀 Deploy to Vercel (5 นาที)

### Step 1: Push to GitHub
```bash
cd roundtable-landing
git init
git add .
git commit -m "Executive Roundtable landing page"
git remote add origin https://github.com/YOUR_ORG/roundtable-landing.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. ไปที่ [vercel.com](https://vercel.com) → **New Project**
2. Import repo จาก GitHub
3. กด **Deploy** (ไม่ต้องเปลี่ยน settings)

### Step 3: ตั้ง monday.com API Token
1. ไปที่ Vercel Dashboard → **Settings** → **Environment Variables**
2. เพิ่ม:
   - **Name:** `MONDAY_API_TOKEN`
   - **Value:** `YOUR_MONDAY_API_TOKEN`
3. กด **Save** แล้ว **Redeploy**

> **หา API Token ได้ที่ไหน?**
> monday.com → Profile Picture → **Administration** → **Connections** → **API** → **Personal API Token**

### Step 4: Custom Domain (Optional)
1. Vercel Dashboard → **Settings** → **Domains**
2. เพิ่ม `roundtable.itticon.com`
3. ตั้ง DNS Record ตามที่ Vercel แนะนำ

---

## 📁 โครงสร้างไฟล์

```
roundtable-landing/
├── index.html          ← Landing page (ITTICON branding)
├── api/
│   └── register.js     ← Serverless function (monday.com API proxy)
├── vercel.json         ← Vercel config
└── README.md           ← คู่มือนี้
```

## 🔗 monday.com Integration

**Board:** Executive Roundtable — Registration
**Board ID:** 18409110358
**Board URL:** https://itticon.monday.com/boards/18409110358

### Columns:
| Column | Type | Column ID |
|--------|------|-----------|
| Name | Item Name | (default) |
| Job Title | Text | text_mm2g97bv |
| Company | Text | text_mm2gpwhz |
| Email | Email | email_mm2g35c8 |
| Phone | Phone | phone_mm2g4vzz |
| Primary Interest | Dropdown | dropdown_mm2g5vpg |
| Registration Status | Status | color_mm2g6rkz |

### Flow:
1. Executive กรอก form บน landing page
2. กด "Confirm Registration"
3. Frontend → `/api/register` (Vercel Serverless Function)
4. Serverless Function → monday.com API (สร้าง item ใน board)
5. แสดง success screen

---

## ⚡ Quick Test (Local)

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Run locally
cd roundtable-landing
vercel dev
```

เปิด http://localhost:3000 เพื่อทดสอบ
