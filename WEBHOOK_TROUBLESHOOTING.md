# Webhook Troubleshooting - "No Messages Received"

## 🔴 Current Status

Your Clerk webhook shows:
- ✅ **Endpoint URL:** `https://skill-screen.onrender.com/api/inngest` (Correct)
- ✅ **Events:** `user.created`, `user.deleted` (Correct)
- ❌ **Status:** "NO MESSAGES RECEIVED IN THE LAST 28 DAYS"

## ✅ Step-by-Step Fix

### Step 1: Verify Render Environment Variables

Go to **Render Dashboard** → Your Service → **Environment** tab

**Check these are set:**
- [ ] `INNGEST_EVENT_KEY` ✅ (you have this)
- [ ] `INNGEST_SIGNING_KEY` ✅ (must be from Inngest dashboard)
- [ ] `NODE_ENV` = `production`
- [ ] `DB_URL` (MongoDB connection string)
- [ ] All other required variables

### Step 2: Test Your Endpoint is Accessible

1. **Open in browser:**
   ```
   https://skill-screen.onrender.com/api/inngest
   ```
   - Should return some response (not 404)
   - If 404, your service might not be deployed correctly

2. **Check Render Logs:**
   - Go to Render Dashboard → Your Service → **Logs** tab
   - Look for any errors when accessing `/api/inngest`
   - Check if server is running: "Server is running on port:..."

### Step 3: Test Webhook Manually

1. **In Clerk Dashboard:**
   - Go to your webhook endpoint
   - Look for a **"Send test event"** or **"Test webhook"** button
   - Click it to send a test `user.created` event

2. **Check Render Logs immediately:**
   - Should see webhook request in logs
   - Look for any errors

### Step 4: Verify Inngest Configuration

1. **In Inngest Dashboard:**
   - Check that App URL is: `https://skill-screen.onrender.com/api/inngest`
   - Verify `INNGEST_SIGNING_KEY` matches what's in Render

2. **Check Inngest Function Status:**
   - Go to Inngest Dashboard → Functions
   - See if `sync-user` function is registered
   - Check for any errors

## 🐛 Common Issues & Solutions

### Issue 1: "404 Not Found" when accessing endpoint

**Solution:**
- Check Render service is deployed and running
- Verify the route is correct: `/api/inngest`
- Check `server.js` has: `app.use("/api/inngest", serve({ client: inngest, functions }));`

### Issue 2: Webhook sends but nothing happens

**Possible causes:**
1. **Missing `INNGEST_SIGNING_KEY`** in Render
   - Add it from Inngest dashboard
   - Redeploy service

2. **Inngest not receiving events**
   - Check Inngest dashboard for function execution logs
   - Verify event name matches: `clerk/user.created`

3. **MongoDB connection issue**
   - Check `DB_URL` is correct
   - Check Render logs for MongoDB connection errors

### Issue 3: "Unauthorized" or "403 Forbidden"

**Solution:**
- Verify `INNGEST_SIGNING_KEY` is correct
- Check Clerk webhook signing secret (if your code verifies it)
- Make sure no authentication middleware blocks `/api/inngest`

## 🔍 Debugging Steps

### 1. Check Render Logs

```bash
# Look for:
- "Server is running on port:..."
- Any requests to "/api/inngest"
- Inngest-related errors
- MongoDB connection messages
```

### 2. Test Endpoint Directly

**Using curl or Postman:**
```bash
curl https://skill-screen.onrender.com/api/inngest
```

**Expected:** Should return some response (not 404)

### 3. Check Inngest Dashboard

- Go to Inngest Dashboard → Functions
- See if `sync-user` function appears
- Check for execution logs
- Look for any errors

### 4. Test with New User

1. **Create a new test user** in your app (sign up)
2. **Immediately check:**
   - Render logs for webhook request
   - Clerk webhook dashboard for delivery status
   - MongoDB for new user document

## ✅ Verification Checklist

After fixing, verify:

- [ ] Render service is running (check logs)
- [ ] `/api/inngest` endpoint is accessible (test in browser)
- [ ] `INNGEST_SIGNING_KEY` is set in Render
- [ ] Inngest dashboard shows functions registered
- [ ] Test webhook in Clerk sends successfully
- [ ] Render logs show webhook received
- [ ] New user signup creates user in MongoDB

## 🚨 If Still Not Working

1. **Check if service is sleeping:**
   - Render free tier services sleep after inactivity
   - First request might take time to wake up
   - Try accessing endpoint, wait 30 seconds, then test webhook

2. **Verify webhook URL in Clerk:**
   - Make sure it's exactly: `https://skill-screen.onrender.com/api/inngest`
   - No trailing slash
   - HTTPS (not HTTP)

3. **Check CORS/authentication:**
   - Make sure `/api/inngest` route is NOT blocked by:
     - CORS middleware
     - Authentication middleware (Clerk middleware might block it)
   - The route should be accessible without authentication

4. **Contact Support:**
   - Check Inngest documentation for Clerk webhook setup
   - Check Render logs for specific error messages
   - Verify all environment variables are correct

## 📝 Next Steps

1. **Add `INNGEST_SIGNING_KEY` to Render** (if missing)
2. **Test endpoint accessibility**
3. **Send test webhook from Clerk**
4. **Check logs and MongoDB**
5. **Create new user and verify sync**
