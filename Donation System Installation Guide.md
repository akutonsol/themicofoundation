# 🚀 Complete Donation System Installation Guide

## 📋 Overview
This system captures donor information through:
1. ✅ Sanity CMS (stores all donation records)
2. ✅ Stripe Payment Processing (handles credit card payments)
3. ✅ Email to Foundation (notifies you of new donations)
4. ✅ Email to Donor (sends receipt/confirmation)

---

## 📦 Step 1: Install Dependencies

```bash
npm install stripe nodemailer @stripe/stripe-js
```

---

## 🗂️ Step 2: Add Donation Schema to Sanity

### 2.1 Copy Schema File
Copy `donation.js` to:
```
src/sanity/schemaTypes/donation.js
```

### 2.2 Update Schema Index
Edit `src/sanity/schemaTypes/index.js`:

```javascript
import donation from './donation'

export const schema = {
  types: [
    hero,
    trustedBy,
    legacyImpact,
    project,
    communityImpact,
    teamMessage,
    messagesSection,
    donationSettings,
    donation,              // ← Add this
    peopleImpact,
    newsEvent,
    newsletterSettings,
    publication,
    faq,
    testimonial,
  ],
}
```

### 2.3 Restart Dev Server
```bash
npm run dev
```

### 2.4 Verify in Sanity Studio
1. Go to Sanity Studio (http://localhost:3333 or /studio)
2. You should see **"Donation"** in the sidebar ✅

---

## 🔐 Step 3: Set Up Stripe

### 3.1 Create Stripe Account
1. Go to https://stripe.com
2. Sign up for an account
3. Complete verification

### 3.2 Get API Keys
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 3.3 Add to Environment Variables
Edit `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

⚠️ **Important:** Never commit these keys to Git!

---

## 📧 Step 4: Set Up Email (Gmail)

### 4.1 Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification**

### 4.2 Create App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Other (Custom name)**
3. Name it: "Mico Foundation Donations"
4. Click **Generate**
5. Copy the 16-character password

### 4.3 Add to Environment Variables
Edit `.env.local`:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # 16-character app password
```

---

## 📁 Step 5: Create API Route

### 5.1 Create Directory
```bash
mkdir -p src/app/api/donate
```

### 5.2 Copy API Route
Copy `route.js` to:
```
src/app/api/donate/route.js
```

---

## 🎨 Step 6: Update DonationForm Component

### 6.1 Open Your Component
Edit: `src/components/home/DonationForm.js`

### 6.2 Add Email Field to Form State
Find the `useState` for `form` (around line 570) and add `email`:

```javascript
const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  email: '', // ← ADD THIS
  address1: '',
  address2: '',
  country: '',
  city: '',
  zip: '',
  state: '',
})
```

### 6.3 Update Email Validation
Find `validateStep2` function and add email validation:

```javascript
const validateStep2 = () => {
  const newErrors = {}
  
  if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
  
  // ADD THIS ↓
  if (!form.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Invalid email address'
  }
  // ADD THIS ↑
  
  if (!form.address1.trim()) newErrors.address1 = 'Address is required'
  // ... rest of validation
}
```

### 6.4 Add submitDonation Function
Add this function inside your `DonationForm` component (around line 690):

```javascript
const submitDonation = async () => {
  try {
    setIsProcessing(true)
    setErrors({})
    
    const amount = selected === 'custom' 
      ? parseFloat(custom) 
      : parseFloat(selected.replace(/[^0-9.]/g, ''))
    
    const donationData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      address1: form.address1,
      address2: form.address2,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
      amount: amount,
      donationType: tab,
      projectId: selectedProject.id,
      projectTitle: selectedProject.title,
      paymentMethod: paymentMethod
    }
    
    const response = await fetch('/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donationData)
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to process donation')
    }
    
    setIsProcessing(false)
    setPaymentSuccess(true)
    
  } catch (error) {
    setErrors({ submit: error.message })
    setIsProcessing(false)
  }
}
```

### 6.5 Update PersonalInfoStep
In the `PersonalInfoStep` component, add email field after Last Name:

```javascript
<div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap:'20px' }}>
  <InputField label="First Name" value={form.firstName} onChange={update('firstName')} error={errors.firstName} />
  <InputField label="Last Name" value={form.lastName} onChange={update('lastName')} error={errors.lastName} />
</div>

{/* ADD THIS ↓ */}
<InputField 
  label="Email Address" 
  value={form.email} 
  onChange={update('email')} 
  error={errors.email} 
  placeholder="your.email@example.com" 
/>
{/* ADD THIS ↑ */}
```

### 6.6 Update onDonate Handler
Find BOTH desktop and mobile `<DonateMethodStep>` components and update the `onDonate` prop:

```javascript
onDonate={() => {
  if (validateStep3()) {
    submitDonation() // ← CHANGE from setTimeout to this
  }
}}
```

---

## 🎯 Step 7: Update Foundation Email

Edit `src/app/api/donate/route.js` and change line 76:

```javascript
to: 'donations@themicofoundation.org', // ← Change to your actual email
```

---

## ✅ Step 8: Test the System

### 8.1 Start Dev Server
```bash
npm run dev
```

### 8.2 Test Donation Flow
1. Go to donation form
2. Fill in all fields
3. Enter test card: `4242 4242 4242 4242`
4. Expiry: Any future date (e.g., 12/25)
5. CVC: Any 3 digits (e.g., 123)
6. Submit

### 8.3 Verify Everything Works
- [ ] Donation appears in Sanity Studio → **Donations**
- [ ] You receive email notification
- [ ] Donor receives confirmation email
- [ ] Payment shows in Stripe Dashboard

---

## 🔧 Troubleshooting

### Email Not Sending?
```bash
# Check Gmail app password is correct
# Check 2FA is enabled on Google account
# Try sending a test email manually
```

### Stripe Error?
```bash
# Verify API keys are in .env.local
# Make sure you're using test keys (pk_test_ and sk_test_)
# Check Stripe dashboard for error logs
```

### Donation Not Saving to Sanity?
```bash
# Verify SANITY_API_TOKEN has Editor permissions
# Check Sanity Studio for the donation schema
# Look at browser console for errors
```

---

## 🚀 Go Live Checklist

When ready for production:

1. **Stripe:**
   - Switch from test keys to live keys
   - Update `.env.local` with live keys
   - Enable live mode in Stripe dashboard

2. **Email:**
   - Use a professional email service (SendGrid, Mailgun, etc.)
   - Set up SPF/DKIM records for deliverability

3. **Sanity:**
   - Already using production dataset ✅

4. **Testing:**
   - Test with real (small) donation
   - Verify all emails arrive
   - Check Sanity records

---

## 📊 View Donations

### In Sanity Studio:
1. Go to http://localhost:3333/structure/donation
2. See all donations with:
   - Donor info
   - Amount
   - Project
   - Payment status
   - Email status

### In Stripe:
1. Go to https://dashboard.stripe.com/payments
2. See all payments

---

## 🎉 You're Done!

Your donation system now:
- ✅ Captures donor information
- ✅ Processes payments via Stripe
- ✅ Stores records in Sanity CMS
- ✅ Sends email to foundation
- ✅ Sends receipt to donor
- ✅ Tracks everything for reporting

---

## 📞 Need Help?

Common issues and solutions in `TROUBLESHOOTING.md`
