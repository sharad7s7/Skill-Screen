# Inngest Setup Guide

## 🔍 Understanding Your Two Endpoints

You have **two different endpoints** that serve different purposes:

### 1. **Your Backend Endpoint** (For Clerk Webhooks)
```
https://skill-screen.onrender.com/api/inngest
```
- **Purpose:** This is where **Clerk sends webhooks** (`user.created`, `user.deleted`)
- **What it does:** Receives webhook events from Clerk and triggers your Inngest functions
- **Use this for:** Clerk webhook configuration

### 2. **Inngest Event Endpoint** (For Sending Events TO Inngest)
```
https://inn.gs/e/_PB1oLcl5zkhAlWbk_Y9zgQE3BHx6w8_d-zYMLqRb3u2a_JJAUsRvetoYtdCUc8A4vz4jz5ePQQI2COEP43Giw
```
- **Purpose:** This is Inngest's **event ingestion endpoint** (for sending events TO Inngest)
- **What it does:** Allows you to manually send events to Inngest (not needed for Clerk webhooks)
- **Use this for:** Testing or manually triggering events (optional)

---

## ✅ What You Need to Add to Render

Based on your Inngest dashboard, you need to add **2 environment variables** to Render:

### Step 1: Get Your Inngest Signing Key

1. In your Inngest dashboard, you should see a **Signing Key** field
2. Click the **eye icon** 👁️ to reveal the full key
3. Copy the **entire signing key** (it starts with `signkey-prod-...`)

### Step 2: Add to Render Environment Variables

Go to **Render Dashboard** → Your Service → **Environment** tab → Add these:

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `INNGEST_EVENT_KEY` | `rEg-noCxhp-245ELoAxZ-57AUsPyEr2NsROMQYS8WzsEk9WM18QcYzfncuinQgbyZyREvgXHljpirQMr9tqc-A` | From your `.env` file (you already have this) |
| `INNGEST_SIGNING_KEY` | `signkey-prod-...` (full key from Inngest dashboard) | **Copy from Inngest dashboard** (click eye icon to reveal) |

---

## 📋 Complete Checklist

### ✅ Inngest Dashboard Setup
- [x] App URL set to: `https://skill-screen.onrender.com/api/inngest`
- [ ] **Copy the `INNGEST_SIGNING_KEY`** from Inngest dashboard (click eye icon)

### ✅ Render Environment Variables
- [ ] `INNGEST_EVENT_KEY` added (you already have this value)
- [ ] `INNGEST_SIGNING_KEY` added (**copy from Inngest dashboard**)

### ✅ Clerk Webhook Setup
- [ ] Clerk webhook endpoint created
- [ ] Webhook URL set to: `https://skill-screen.onrender.com/api/inngest`
- [ ] `user.created` event subscribed
- [ ] `user.deleted` event subscribed (optional)

---

## 🎯 Which Endpoint to Use Where

### For Clerk Webhooks:
**Use:** `https://skill-screen.onrender.com/api/inngest`
- This is where Clerk sends webhook events
- Your backend receives them and triggers Inngest functions

### For Inngest Dashboard:
**App URL:** `https://skill-screen.onrender.com/api/inngest`
- This tells Inngest where your functions are hosted
- Already configured correctly ✅

### For Manual Event Testing (Optional):
**Use:** `https://inn.gs/e/...` (the long URL)
- Only if you want to manually send test events
- Not needed for Clerk webhooks to work

---

## 🔧 Step-by-Step: Adding INNGEST_SIGNING_KEY to Render

1. **Go to Inngest Dashboard**
   - Open the page showing "Choose syncing method"
   - Find the **Signing Key** field
   - Click the **eye icon** 👁️ to reveal the full key

2. **Copy the Full Signing Key**
   - It should look like: `signkey-prod-febccfded0fe31cf249045c2acf63c71dcaa0a60a2ee090196bd56be2e98b6b5`
   - Copy the **entire** key (it's long!)

3. **Add to Render**
   - Go to Render Dashboard → Your Service
   - Click **Environment** tab
   - Click **Add Environment Variable**
   - Name: `INNGEST_SIGNING_KEY`
   - Value: Paste the full signing key you copied
   - Click **Save Changes**

4. **Redeploy**
   - After adding the variable, trigger a new deploy
   - Go to **Manual Deploy** → **Deploy latest commit**

---

## ⚠️ Important Notes

1. **The `INNGEST_SIGNING_KEY` is different from `INNGEST_EVENT_KEY`**
   - `INNGEST_EVENT_KEY`: Used to send events TO Inngest
   - `INNGEST_SIGNING_KEY`: Used by Inngest to verify requests to your backend

2. **Both keys are required** for Inngest to work properly

3. **After adding `INNGEST_SIGNING_KEY`**, make sure to:
   - Save changes in Render
   - Trigger a new deploy
   - Wait for deployment to complete

4. **Verify it's working:**
   - Check Render logs for Inngest-related messages
   - Test by creating a new user in Clerk
   - Check MongoDB to see if user was created

---

## 🐛 Troubleshooting

### "Inngest functions not executing"

1. **Check `INNGEST_SIGNING_KEY` is set correctly**
   - Must be the full key from Inngest dashboard
   - No extra spaces or characters

2. **Check App URL in Inngest dashboard**
   - Must be exactly: `https://skill-screen.onrender.com/api/inngest`
   - No trailing slash

3. **Check Render logs**
   - Look for Inngest-related errors
   - Check if webhook requests are being received

### "Clerk webhooks not working"

1. **Verify Clerk webhook URL**
   - Must be: `https://skill-screen.onrender.com/api/inngest`
   - Check in Clerk Dashboard → Webhooks

2. **Check both Inngest keys are set**
   - `INNGEST_EVENT_KEY` ✅
   - `INNGEST_SIGNING_KEY` ✅

3. **Check Render service is running**
   - Service must be active and deployed

---

## 📝 Summary

**What you need to do:**

1. ✅ **Copy `INNGEST_SIGNING_KEY`** from Inngest dashboard (click eye icon)
2. ✅ **Add to Render** as environment variable `INNGEST_SIGNING_KEY`
3. ✅ **Configure Clerk webhook** to point to: `https://skill-screen.onrender.com/api/inngest`
4. ✅ **Redeploy** your Render service

**Which endpoint to use:**
- **Clerk webhooks:** `https://skill-screen.onrender.com/api/inngest` ✅
- **Inngest event URL:** Only for manual testing (optional)

That's it! Once `INNGEST_SIGNING_KEY` is added to Render, Inngest will be able to communicate with your backend properly.
