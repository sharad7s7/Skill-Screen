# Environment Variables for Render Deployment

## 📋 Complete List of Environment Variables to Add on Render

Since your backend serves the frontend in production, add **ALL** of these environment variables to your Render backend service.

### 🔧 How to Add Environment Variables on Render

1. Go to your Render Dashboard
2. Click on your **Web Service** (backend service)
3. Go to the **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable one by one using the list below

---

## ✅ Environment Variables to Add

### Backend Variables (Required)

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `PORT` | `10000` | Or use `$PORT` (Render sets this automatically) |
| `DB_URL` | `your_mongodb_connection_string` | Your MongoDB Atlas connection string |
| `NODE_ENV` | `production` | Must be `production` |
| `CLIENT_URL` | `https://your-service-name.onrender.com` | Replace with your actual Render service URL |
| `INNGEST_EVENT_KEY` | `your_inngest_event_key` | From your Inngest dashboard |
| `INNGEST_SIGNING_KEY` | `your_inngest_signing_key` | From your Inngest dashboard |
| `STREAM_API_KEY` | `your_stream_api_key` | From your Stream.io dashboard |
| `STREAM_API_SECRET` | `your_stream_api_secret` | From your Stream.io dashboard |
| `CLERK_PUBLISHABLE_KEY` | `your_clerk_publishable_key` | From your Clerk dashboard |
| `CLERK_SECRET_KEY` | `your_clerk_secret_key` | From your Clerk dashboard |

### Frontend Variables (Required for Build)

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `VITE_CLERK_PUBLISHABLE_KEY` | `your_clerk_publishable_key` | Same as CLERK_PUBLISHABLE_KEY |
| `VITE_API_URL` | `https://your-service-name.onrender.com/` | **Must end with `/`** - Your Render service URL |
| `VITE_STREAM_API_KEY` | `your_stream_api_key` | Same as STREAM_API_KEY |

---

## 📝 Example Values (Replace with Your Actual Values)

```
PORT=10000
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/Skill-Screen?appName=Cluster0
NODE_ENV=production
CLIENT_URL=https://skill-screen-backend.onrender.com
INNGEST_EVENT_KEY=rEg-noCxhp-245ELoAxZ-57AUsPyEr2NsROMQYS8WzsEk9WM18QcYzfncuinQgbyZyREvgXHljpirQMr9tqc-A
INNGEST_SIGNING_KEY=signkey-prod-febccfded0fe31cf249045c2acf63c71dcaa0a60a2ee090196bd56be2e98b6b5
STREAM_API_KEY=2dbkqctavt2c
STREAM_API_SECRET=zw8zp3e2vfr656bvdv8dkza6bcw8hnnzsutapgbqufzbbdkbnm797v86ru2fkdxv
CLERK_PUBLISHABLE_KEY=pk_test_ZGFzaGluZy1jYXR0bGUtODMuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_Ip7gKCdFM40dy2gliFOOr1G7BfUfeXb9VEv5pEfeiP
VITE_CLERK_PUBLISHABLE_KEY=pk_test_ZGFzaGluZy1jYXR0bGUtODMuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_API_URL=https://skill-screen-backend.onrender.com/
VITE_STREAM_API_KEY=2dbkqctavt2c
```

---

## ⚠️ Important Notes

1. **Replace `your-service-name.onrender.com`** with your actual Render service URL
   - You'll get this URL after creating the service (e.g., `skill-screen-abc123.onrender.com`)

2. **`VITE_API_URL` must end with `/`** (trailing slash)
   - ✅ Correct: `https://your-service.onrender.com/`
   - ❌ Wrong: `https://your-service.onrender.com`

3. **`CLIENT_URL` should NOT have trailing slash**
   - ✅ Correct: `https://your-service.onrender.com`
   - ❌ Wrong: `https://your-service.onrender.com/`

4. **After adding variables**, you must **trigger a new deploy** for changes to take effect
   - Go to **Manual Deploy** → **Deploy latest commit**

5. **Same values for some variables:**
   - `CLERK_PUBLISHABLE_KEY` = `VITE_CLERK_PUBLISHABLE_KEY` (same value)
   - `STREAM_API_KEY` = `VITE_STREAM_API_KEY` (same value)

---

## 🚀 Quick Checklist

- [ ] PORT set to `10000` or `$PORT`
- [ ] DB_URL (MongoDB connection string)
- [ ] NODE_ENV = `production`
- [ ] CLIENT_URL (your Render URL, no trailing slash)
- [ ] INNGEST_EVENT_KEY
- [ ] INNGEST_SIGNING_KEY
- [ ] STREAM_API_KEY
- [ ] STREAM_API_SECRET
- [ ] CLERK_PUBLISHABLE_KEY
- [ ] CLERK_SECRET_KEY
- [ ] VITE_CLERK_PUBLISHABLE_KEY (same as CLERK_PUBLISHABLE_KEY)
- [ ] VITE_API_URL (your Render URL with trailing slash `/`)
- [ ] VITE_STREAM_API_KEY (same as STREAM_API_KEY)

---

## 📸 Visual Guide

When adding variables in Render, it will look like this:

```
Environment Variable Name: PORT
Value: 10000
```

```
Environment Variable Name: VITE_API_URL
Value: https://your-service.onrender.com/
```

Make sure to click **Save Changes** after adding all variables!
