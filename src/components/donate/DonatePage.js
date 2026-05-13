"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Landmark,
  Copy,
  CircleHelp,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Buxton College",
    location: "Jamaica, Buxton",
    image: "https://www.figma.com/api/mcp/asset/37654856-aac7-4496-9e4d-5c95ddbd0269",
    progress: 65,
    currentAmountLabel: "$14M",
    goalAmountLabel: "$20M",
    impactMap: { 5: 2, 10: 4, 20: 8, 30: 12, 50: 20, 100: 40 },
  },
  {
    id: 2,
    title: "Smart Classroom",
    location: "Kingston, Jamaica",
    image: "https://www.figma.com/api/mcp/asset/a508b729-b5e0-47de-8603-4498a8b38f3d",
    progress: 48,
    currentAmountLabel: "$9.6M",
    goalAmountLabel: "$20M",
    impactMap: { 5: 1, 10: 3, 20: 7, 30: 10, 50: 16, 100: 34 },
  },
  {
    id: 3,
    title: "Complete Project №1",
    location: "St. Mary, Jamaica",
    image: "https://www.figma.com/api/mcp/asset/37e16fa6-667d-421f-b3e1-58fad1526118",
    progress: 73,
    currentAmountLabel: "$14.6M",
    goalAmountLabel: "$20M",
    impactMap: { 5: 3, 10: 5, 20: 10, 30: 14, 50: 22, 100: 45 },
  },
];

const stepItems = [
  {
    number: 1,
    title: "Donate Amount",
    description: "Choose your donation target and amount.",
  },
  {
    number: 2,
    title: "Personal Info",
    description: "Fill some required fields to continue.",
  },
  {
    number: 3,
    title: "Donate Method",
    description: "Choose best option for you to send your donation.",
  },
];

const amountGrid = {
  once: [10, 25, 30, 100, 50, 250],
  monthly: [5, 10, 20, 30, 50, 100],
};

function Sparkle() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0L16.5 11.5L28 14L16.5 16.5L14 28L11.5 16.5L0 14L11.5 11.5L14 0Z"
        fill="#D9D9D9"
      />
    </svg>
  );
}

function Stepper({ activeStep = 1 }) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row">
      {stepItems.map((step, index) => {
        const isActive = step.number === activeStep;

        return (
          <div
            key={step.number}
            className="flex flex-1 items-center gap-4 rounded-[20px] border border-[#E5E6EB] bg-[#FFFDF9] px-5 py-5 sm:px-6 sm:py-5"
          >
            <div className="flex flex-1 items-start gap-4">
              <div
                className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[16px] text-[22px] font-semibold tracking-[-0.05em] ${
                  isActive
                    ? "bg-[#FFD900] text-[#040617]"
                    : "border border-[#E5E6EB] bg-transparent text-[#040617]/45"
                }`}
                style={{ fontFamily: "'inter', sans-serif" }}
              >
                {step.number}
              </div>

              <div className="min-w-0">
                <h3
                  className={`text-[28px] leading-[1.05] tracking-[-0.04em] font-semibold sm:text-[32px] ${
                    isActive ? "text-[#040617]" : "text-[#040617]/45"
                  }`}
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-1 max-w-[260px] text-[18px] leading-[1.3] tracking-[0.01em] sm:text-[20px] ${
                    isActive ? "text-[#6F7181]" : "text-[#6F7181]/70"
                  }`}
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {index < stepItems.length - 1 && (
              <span className="hidden pt-2 text-[34px] leading-none text-[#6F7181]/55 xl:block">
                ›
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProgressTicks({ progress }) {
  const totalTicks = 40;
  const activeTicks = Math.round((progress / 100) * totalTicks);

  return (
    <div className="mt-4">
      <div
        className="text-center text-[28px] font-normal tracking-[-0.03em] text-[#5EDA71]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        {progress}%
      </div>

      <div
        className="mt-3 grid gap-[6px]"
        style={{ gridTemplateColumns: "repeat(40, minmax(0, 1fr))" }}
      >
        {Array.from({ length: totalTicks }).map((_, index) => (
          <div
            key={index}
            className={`h-[14px] rounded-full ${
              index < activeTicks ? "bg-[#5EDA71]" : "bg-[#D9D9D9]/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectPanel({ project, onPrev, onNext }) {
  return (
    <div className="rounded-[20px] border border-[#E5E6EB] bg-[#FFFDF9] p-4 md:p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-[30px] font-semibold leading-[1] tracking-[-0.05em] text-[#040617] sm:text-[36px] lg:text-[40px]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            {project.title}
          </h2>
          <button
            className="mt-2 text-[20px] text-[#6F7181] underline underline-offset-4 sm:text-[24px]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Learn more
          </button>
        </div>

        <div
          className="mt-2 hidden items-center gap-2 text-[14px] text-[#6F7181] sm:flex"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.985 }}
          transition={{ duration: 0.25 }}
          className="mt-5"
        >
          <div className="relative aspect-[1.52/1] overflow-hidden rounded-[12px] bg-neutral-200">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <ProgressTicks progress={project.progress} />

      <div
        className="mt-2 flex items-center justify-between text-[20px] text-[#6F7181] sm:text-[24px]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        <span className="opacity-80">$0</span>
        <span className="text-[#5EDA71]">{project.currentAmountLabel}</span>
        <span className="opacity-80">{project.goalAmountLabel}</span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-3 text-[18px] text-[#040617]/70 sm:text-[20px]"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          <span>Last Project</span>
          <button
            onClick={onPrev}
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] border-2 border-[#040617]/60 bg-transparent text-[#040617]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {projects.map((item) => (
            <span
              key={item.id}
              className={`h-[12px] rounded-full ${
                item.id === project.id ? "w-[52px] bg-[#FFD900]" : "w-[52px] bg-[#D9D9D9]/50"
              }`}
            />
          ))}
        </div>

        <div
          className="flex items-center gap-3 text-[18px] text-[#040617] sm:text-[20px]"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          <button
            onClick={onNext}
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#040617] text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <span>Next Project</span>
        </div>
      </div>
    </div>
  );
}

function AmountButton({ value, active, onClick, monthly }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`w-full cursor-pointer rounded-[20px] border px-4 py-[10px] text-center text-[22px] leading-[1.55] tracking-[0.01em] transition sm:text-[24px] ${
        active
          ? "border-[#FFD900] bg-[#FFD900] text-[#040617]"
          : "border-[#E5E6EB] bg-[#FFFDF9] text-[#040617] hover:border-[#FFD900]/60 hover:bg-[#FFF9D6]"
      }`}
      style={{ fontFamily: "'inter', sans-serif" }}
    >
      ${value}
      {monthly ? "/Month" : ""}
    </button>
  );
}

function ImpactPanel({ project, selectedAmount, donationType }) {
  const studentsSupported =
    project.impactMap[selectedAmount] ?? Math.max(1, Math.round(selectedAmount / 2));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${project.id}-${selectedAmount}-${donationType}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-b-[20px] bg-[#E8E9EB] px-6 py-6 text-[18px] leading-[1.5] text-[#636473] sm:text-[20px]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        Your <strong className="text-[#040617]">${selectedAmount}</strong> donation can help
        equip up to <strong className="text-[#040617]">{studentsSupported} students</strong>{" "}
        with school supplies, access to technology, and a safe learning environment —
        giving them the chance to thrive and build a better future.
      </motion.div>
    </AnimatePresence>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder = "Start Typing...",
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label
        className="text-[16px] leading-6 text-[#414651]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-[14px] py-[10px] text-[16px] leading-6 text-[#040617] outline-none placeholder:text-[#6F7181] shadow-[0px_1px_2px_rgba(10,13,18,0.05)]"
        style={{ fontFamily: "'inter', sans-serif" }}
      />
    </div>
  );
}

function Step1DonateAmount({
  donationType,
  setDonationType,
  selectedAmount,
  setSelectedAmount,
  project,
  onNext,
}) {
  return (
    <div className="overflow-hidden rounded-[20px]">
      <div className="overflow-hidden rounded-t-[20px] border border-[#E5E6EB] bg-[#FFFDF9]">
        <div className="grid grid-cols-2 border-b border-[#E5E6EB]">
          <button
            onClick={() => setDonationType("once")}
            className={`relative px-4 py-4 text-[22px] leading-[1.55] tracking-[0.01em] sm:text-[24px] ${
              donationType === "once" ? "text-[#040617]" : "text-[#040617]/70"
            }`}
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Donate Once
            {donationType === "once" && (
              <motion.span
                layoutId="donationTab"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FFD900]"
              />
            )}
          </button>

          <button
            onClick={() => setDonationType("monthly")}
            className={`relative px-4 py-4 text-[22px] leading-[1.55] tracking-[0.01em] sm:text-[24px] ${
              donationType === "monthly" ? "text-[#040617]" : "text-[#040617]/70"
            }`}
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Donate Monthly
            {donationType === "monthly" && (
              <motion.span
                layoutId="donationTab"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FFD900]"
              />
            )}
          </button>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {amountGrid[donationType].map((amount) => (
              <AmountButton
                key={`${donationType}-${amount}`}
                value={amount}
                monthly={donationType === "monthly"}
                active={selectedAmount === amount}
                onClick={setSelectedAmount}
              />
            ))}
          </div>

          <button
            className="mt-4 w-full rounded-[20px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 py-[10px] text-[22px] leading-[1.55] tracking-[0.01em] text-[#040617] sm:text-[24px]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Custom
          </button>

          <p
            className="mt-4 text-[15px] text-[#6F7181]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            *All donations over $2 are tax deductible
          </p>

          <button
            onClick={onNext}
            className="mt-8 w-full rounded-[18px] bg-[#FFD900] px-6 py-4 text-[16px] font-semibold text-[#040617] transition hover:scale-[1.01] active:scale-[0.98]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Donate to {project.title} →
          </button>
        </div>
      </div>

      <ImpactPanel
        project={project}
        selectedAmount={selectedAmount}
        donationType={donationType}
      />
    </div>
  );
}

function Step2PersonalInfo({
  formData,
  setFormData,
  selectedAmount,
  project,
  donationType,
  onBack,
  onNext,
}) {
  const updateField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#E5E6EB] bg-[#FFFDF9]">
      <div className="border-b border-[#E5E6EB] px-6 py-4 text-center">
        <h3
          className="text-[28px] leading-[1.2] text-[#040617] sm:text-[40px]"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          Personal Info
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-[8%] top-[6%] opacity-25">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute right-[12%] top-[10%] opacity-25">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute right-[18%] bottom-[22%] opacity-25">
          <Sparkle />
        </div>

        <div className="p-6">
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-[20px] text-[#040617]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="First Name"
                  value={formData.firstName}
                  onChange={updateField("firstName")}
                />
                <InputField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={updateField("lastName")}
                />
              </div>

              <InputField
                label="Address Line 1"
                value={formData.address1}
                onChange={updateField("address1")}
              />

              <InputField
                label="Address Line 2 (Optional)"
                value={formData.address2}
                onChange={updateField("address2")}
              />
            </div>

            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Country"
                  value={formData.country}
                  onChange={updateField("country")}
                />
                <InputField
                  label="City"
                  value={formData.city}
                  onChange={updateField("city")}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="ZIP/Postal Code"
                  value={formData.zip}
                  onChange={updateField("zip")}
                />
                <InputField
                  label="State/Province"
                  value={formData.state}
                  onChange={updateField("state")}
                />
              </div>

              <div className="flex justify-end pt-7">
                <button
                  onClick={onNext}
                  className="rounded-[18px] bg-[#FFD900] px-7 py-4 text-[16px] font-semibold text-[#040617] transition hover:scale-[1.01] active:scale-[0.98]"
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  Donation Method →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImpactPanel
        project={project}
        selectedAmount={selectedAmount}
        donationType={donationType}
      />
    </div>
  );
}

function PaymentTabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center gap-3 px-5 py-5 text-[24px] text-[#040617] ${
        active ? "opacity-100" : "opacity-75"
      }`}
      style={{ fontFamily: "'inter', sans-serif" }}
    >
      {icon}
      <span>{label}</span>
      {active && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FFD900]" />}
    </button>
  );
}

function PaymentInput({
  label,
  value,
  onChange,
  placeholder = "Start Typing...",
  iconLeft,
  iconRight,
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label
        className="text-[16px] leading-6 text-[#414651]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-[14px] py-[10px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
        {iconLeft}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-[16px] leading-6 text-[#040617] outline-none placeholder:text-[#6F7181]"
          style={{ fontFamily: "'inter', sans-serif" }}
        />
        {iconRight}
      </div>
    </div>
  );
}

function BankRow({ label, value }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  };

  return (
    <div>
      <p
        className="text-[14px] leading-6 text-[#8B8E9D]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        {label}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <p
          className="text-[18px] text-[#040617] sm:text-[20px]"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          {value}
        </p>
        <button
          onClick={copyToClipboard}
          className="text-[#040617]/80"
          type="button"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Step3DonateMethod({
  project,
  selectedAmount,
  donationType,
  paymentTab,
  setPaymentTab,
  paymentData,
  setPaymentData,
  onBack,
}) {
  const updateField = (field) => (e) =>
    setPaymentData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <ProjectPanel project={project} onPrev={() => {}} onNext={() => {}} />

      <div className="overflow-hidden rounded-[20px] border border-[#E5E6EB] bg-[#FFFDF9]">
        <div className="grid grid-cols-3 border-b border-[#E5E6EB]">
          <PaymentTabButton
            active={paymentTab === "card"}
            onClick={() => setPaymentTab("card")}
            icon={<CreditCard className="h-6 w-6" />}
            label="Card"
          />
          <PaymentTabButton
            active={paymentTab === "paypal"}
            onClick={() => setPaymentTab("paypal")}
            icon={
              <span
                className="text-[18px] font-semibold text-[#003087]"
                style={{ fontFamily: "'inter', sans-serif" }}
              >
                PayPal
              </span>
            }
            label="Paypal"
          />
          <PaymentTabButton
            active={paymentTab === "inperson"}
            onClick={() => setPaymentTab("inperson")}
            icon={<Landmark className="h-6 w-6" />}
            label="In Person"
          />
        </div>

        <div className="relative overflow-hidden p-6">
          <div className="pointer-events-none absolute left-[20%] top-[10%] opacity-25">
            <Sparkle />
          </div>
          <div className="pointer-events-none absolute right-[25%] top-[18%] opacity-25">
            <Sparkle />
          </div>
          <div className="pointer-events-none absolute right-[12%] bottom-[28%] opacity-25">
            <Sparkle />
          </div>

          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-[20px] text-[#040617]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>

          {paymentTab === "card" && (
            <>
              <div className="space-y-5">
                <PaymentInput
                  label="Credit Card Number"
                  value={paymentData.cardNumber}
                  onChange={updateField("cardNumber")}
                  placeholder="Card number"
                  iconLeft={<CreditCard className="h-5 w-5 text-[#6F7181]" />}
                  iconRight={<CircleHelp className="h-4 w-4 text-[#8B8E9D]" />}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <PaymentInput
                    label="Date of Expire"
                    value={paymentData.expiry}
                    onChange={updateField("expiry")}
                  />
                  <PaymentInput
                    label="CVC / CVV"
                    value={paymentData.cvc}
                    onChange={updateField("cvc")}
                    iconRight={<CircleHelp className="h-4 w-4 text-[#8B8E9D]" />}
                  />
                </div>
              </div>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E5E6EB]" />
                <span
                  className="text-[18px] text-[#6F7181]"
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  or
                </span>
                <div className="h-px flex-1 bg-[#E5E6EB]" />
              </div>

              <div>
                <h4
                  className="text-[30px] font-semibold tracking-[-0.04em] text-[#040617]"
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  Bank Deposit
                </h4>

                <p
                  className="mt-3 text-[18px] text-[#040617]"
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  Buxton Restoration Banking Details
                </p>

                <div className="mt-5 space-y-4">
                  <BankRow
                    label="Recipient / Beneficiary Name:"
                    value="Mico Heritage Enterprise, BNS New Kingston"
                  />

                  <div className="grid gap-5 md:grid-cols-3">
                    <BankRow label="Account Number:" value="10006017" />
                    <BankRow label="SWIFT/BIC Code:" value="NOSCJMKN" />
                    <BankRow label="Bank Transit Number:" value="50575" />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p
                      className="text-[18px] text-[#6F7181]"
                      style={{ fontFamily: "'inter', sans-serif" }}
                    >
                      Your Donation to {project.title}:
                    </p>
                    <p
                      className="mt-2 text-[24px] text-[#040617] sm:text-[32px]"
                      style={{ fontFamily: "'inter', sans-serif" }}
                    >
                      ${selectedAmount}
                      {donationType === "monthly" ? "/Month" : ""}
                      <span className="ml-2 text-[18px] text-[#2F8A45]">
                        +1% to total target
                      </span>
                    </p>
                  </div>

                  <button
                    className="rounded-[18px] bg-[#F4E8A5] px-7 py-4 text-[16px] font-semibold text-[#040617] transition hover:scale-[1.01] active:scale-[0.98]"
                    style={{ fontFamily: "'inter', sans-serif" }}
                  >
                    Donate Now →
                  </button>
                </div>
              </div>
            </>
          )}

          {paymentTab === "paypal" && (
            <div className="py-10 text-center">
              <p
                className="text-[24px] text-[#040617]"
                style={{ fontFamily: "'inter', sans-serif" }}
              >
                Continue with PayPal to complete your donation.
              </p>
              <button
                className="mt-8 rounded-[18px] bg-[#FFD900] px-7 py-4 text-[16px] font-semibold text-[#040617]"
                style={{ fontFamily: "'inter', sans-serif" }}
              >
                Continue with PayPal →
              </button>
            </div>
          )}

          {paymentTab === "inperson" && (
            <div className="py-6">
              <h4
                className="text-[30px] font-semibold tracking-[-0.04em] text-[#040617]"
                style={{ fontFamily: "'inter', sans-serif" }}
              >
                In Person Donation
              </h4>
              <p
                className="mt-4 max-w-[700px] text-[20px] leading-[1.5] text-[#636473]"
                style={{ fontFamily: "'inter', sans-serif" }}
              >
                Please contact our team to arrange an in-person donation handoff for{" "}
                {project.title}. We will guide you through the next steps.
              </p>
              <button
                className="mt-8 rounded-[18px] bg-[#FFD900] px-7 py-4 text-[16px] font-semibold text-[#040617]"
                style={{ fontFamily: "'inter', sans-serif" }}
              >
                Contact Team →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DonatePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [projectIndex, setProjectIndex] = useState(0);
  const [donationType, setDonationType] = useState("monthly");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [paymentTab, setPaymentTab] = useState("card");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address1: "",
    address2: "",
    zip: "",
    state: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const project = useMemo(() => projects[projectIndex], [projectIndex]);

  const goPrevProject = () => {
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goNextProject = () => {
    setProjectIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] px-4 pt-16 pb-8 sm:px-6 lg:px-10 lg:pt-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;800&family=inter:wght@400;500&display=swap');
      `}</style>

      <div className="relative mx-auto max-w-[1590px]">
        <div className="pointer-events-none absolute left-0 top-0 -translate-x-4 -translate-y-4 opacity-60">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-60">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 -translate-x-4 translate-y-4 opacity-60">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-4 translate-y-4 opacity-60">
          <Sparkle />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center text-[52px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#040617] sm:text-[64px] lg:text-[75px]"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          Donation Form
        </motion.h1>

        <Stepper activeStep={activeStep} />

        <div className="mt-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeStep === 1 && (
                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                  <ProjectPanel
                    project={project}
                    onPrev={goPrevProject}
                    onNext={goNextProject}
                  />

                  <Step1DonateAmount
                    donationType={donationType}
                    setDonationType={setDonationType}
                    selectedAmount={selectedAmount}
                    setSelectedAmount={setSelectedAmount}
                    project={project}
                    onNext={() => setActiveStep(2)}
                  />
                </div>
              )}

              {activeStep === 2 && (
                <Step2PersonalInfo
                  formData={formData}
                  setFormData={setFormData}
                  selectedAmount={selectedAmount}
                  project={project}
                  donationType={donationType}
                  onBack={() => setActiveStep(1)}
                  onNext={() => setActiveStep(3)}
                />
              )}

              {activeStep === 3 && (
                <Step3DonateMethod
                  project={project}
                  selectedAmount={selectedAmount}
                  donationType={donationType}
                  paymentTab={paymentTab}
                  setPaymentTab={setPaymentTab}
                  paymentData={paymentData}
                  setPaymentData={setPaymentData}
                  onBack={() => setActiveStep(2)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}