# Clerk Webhook Setup for User Sync

## 🔴 Problem

Users are showing in Clerk but **NOT** being added to MongoDB. This causes "User not found" errors when creating sessions.

## ✅ Solution: Configure Clerk Webhook

Your backend uses **Inngest** to sync users from Clerk to MongoDB. You need to configure Clerk to send webhook events to your Inngest endpoint.

---

## 📋 Step-by-Step Instructions

### 1. Go to Clerk Dashboard

1. Log in to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Webhooks** in the left sidebar

### 2. Create a New Webhook Endpoint

1. Click **"Add Endpoint"** or **"Create Webhook"**
2. Enter your webhook URL:
   ```
   https://skill-screen.onrender.com/api/inngest
   ```
   ⚠️ **Important:** Replace `skill-screen.onrender.com` with your actual Render service URL if different

### 3. Select Events to Listen To

You need to subscribe to these events:

- ✅ **`user.created`** - When a new user signs up
- ✅ **`user.deleted`** - When a user is deleted (optional but recommended)

### 4. Save the Webhook

1. Click **"Create"** or **"Save"**
2. Clerk will generate a **Signing Secret** - **SAVE THIS!** You'll need it for Inngest

### 5. Configure Inngest (if needed)

If Inngest requires the Clerk signing secret:

1. Go to your [Inngest Dashboard](https://app.inngest.com)
2. Find your app or create one
3. Add the Clerk signing secret if required

**Note:** Your code already handles the webhook at `/api/inngest` endpoint (see `backend/src/server.js` line 24)

---

## 🔍 Verify Webhook is Working

### Test the Webhook

1. **Create a test user** in Clerk (or sign up a new user)
2. **Check your Render logs:**
   - Go to Render Dashboard → Your Service → **Logs** tab
   - Look for messages like:
     - "Stream user upserted successfully"
     - Any Inngest function execution logs

3. **Check MongoDB:**
   - Go to MongoDB Atlas → Browse Collections
   - Check if a new user document was created in the `users` collection

### Check Render Logs for Errors

If webhook isn't working, check Render logs for:
- `404` errors (webhook URL wrong)
- `401/403` errors (authentication issue)
- Inngest function errors

---

## 🛠️ Alternative: Manual User Creation (Temporary Fix)

If you need users to work **right now** while setting up the webhook, you can manually create users in MongoDB:

### Option 1: Create User via MongoDB Atlas

1. Go to MongoDB Atlas → Browse Collections → `users` collection
2. Click **"Insert Document"**
3. Add a document like this (replace with actual values):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "profileImage": "https://...",
  "clerkId": "user_xxxxxxxxxxxxx"
}
```

**To find the `clerkId`:**
- Go to Clerk Dashboard → Users
- Click on the user
- Copy the **User ID** (this is the `clerkId`)

### Option 2: Create User via API (if you add an endpoint)

You could temporarily add an endpoint to manually sync users, but the webhook is the proper solution.

---

## ✅ After Webhook is Configured

1. **New users** will automatically be created in MongoDB when they sign up
2. **Existing users** in Clerk won't be automatically synced - you'll need to:
   - Either manually create them in MongoDB (see above)
   - Or trigger the webhook manually for existing users
   - Or wait for them to sign in again (if Clerk sends a webhook on sign-in)

---

## 🔗 Important URLs

- **Clerk Dashboard:** https://dashboard.clerk.com
- **Inngest Dashboard:** https://app.inngest.com
- **Your Webhook Endpoint:** `https://skill-screen.onrender.com/api/inngest`
- **MongoDB Atlas:** https://cloud.mongodb.com

---

## 📝 Checklist

- [ ] Clerk webhook endpoint created
- [ ] Webhook URL points to: `https://your-service.onrender.com/api/inngest`
- [ ] `user.created` event subscribed
- [ ] `user.deleted` event subscribed (optional)
- [ ] Tested by creating a new user
- [ ] Verified user appears in MongoDB
- [ ] Checked Render logs for any errors

---

## 🐛 Troubleshooting

### Webhook not receiving events

1. **Check webhook URL** - Make sure it's exactly: `https://your-service.onrender.com/api/inngest`
2. **Check Render service is running** - Service must be active
3. **Check Inngest environment variables** - `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` must be set
4. **Check Render logs** - Look for webhook requests and errors

### Users still not being created

1. **Check MongoDB connection** - Verify `DB_URL` is correct in Render env vars
2. **Check Inngest function** - Look at Inngest dashboard for function execution logs
3. **Check for duplicate users** - If user with same `clerkId` or `email` exists, creation will fail

### "User not found" error persists

1. **Manually create the user** in MongoDB (see above)
2. **Or wait for webhook** to process (may take a few seconds)
3. **Check `protectRoute` middleware** - It's working correctly, just needs user in DB
