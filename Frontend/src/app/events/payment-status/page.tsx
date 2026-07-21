"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, ArrowRight, AlertCircle, Download } from "lucide-react";
import { API_URL } from "@/lib/api";

interface PaymentStatusDetails {
  amount?: number;
  paymentMode?: string;
  respDescription?: string;
  txnID?: string;
  receiptNo?: string;
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  founderName?: string;
  paymentDateTime?: string;
}

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const statusParam = searchParams.get("status");
  const txnNo = searchParams.get("txnNo");
  const reasonParam = searchParams.get("reason");

  const [loading, setLoading] = useState(true);
  const [verifiedStatus, setVerifiedStatus] = useState<"success" | "failed" | "pending">("pending");
  const [details, setDetails] = useState<PaymentStatusDetails | null>(null);

  useEffect(() => {
    if (!txnNo) {
      setLoading(false);
      setVerifiedStatus("failed");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/payment/status/${txnNo}`);
        if (!res.ok) {
          throw new Error("Failed to verify transaction status");
        }
        const data = await res.json();
        
        if (data.status === "SUCCESS") {
          setVerifiedStatus("success");
        } else if (data.status === "FAILED") {
          setVerifiedStatus("failed");
        } else {
          setVerifiedStatus("pending");
        }
        setDetails(data);
      } catch (err) {
        console.error("Error verifying payment status:", err);
        // Fall back to parameters passed in query string if API is down
        if (statusParam === "success") {
          setVerifiedStatus("success");
        } else {
          setVerifiedStatus("failed");
        }
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [txnNo, statusParam]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Loader2 className="w-12 h-12 text-[#FFD700] animate-spin mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Verifying Payment</h2>
        <p className="text-gray-400 text-sm max-w-sm">
          Please wait while we confirm your payment status with the bank. Do not refresh or close this page.
        </p>
      </div>
    );
  }

  const isSuccess = verifiedStatus === "success";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-30 ${isSuccess ? "bg-green-500" : "bg-red-500"}`} />
        <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-30 ${isSuccess ? "bg-emerald-500" : "bg-rose-500"}`} />Block

        <div className="flex flex-col items-center text-center relative z-10">
          {isSuccess ? (
            <>
              <CheckCircle className="w-16 h-16 text-emerald-400 mb-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center justify-center gap-2">
                Registration Confirmed
              </h1>
              <p className="text-emerald-300 text-xs font-semibold mb-6 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                Payment Successful
              </p>
              
              <div className="w-full border-t border-b border-white/5 py-4 mb-6 text-left space-y-3">
                {details?.receiptNo && details.receiptNo !== "—" && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Receipt Number</span>
                    <span className="text-[#FFD700] font-black">{details.receiptNo}</span>
                  </div>
                )}
                {details?.eventName && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Event Name</span>
                    <span className="text-white font-semibold text-right max-w-[200px] truncate" title={details.eventName}>{details.eventName}</span>
                  </div>
                )}
                {details?.eventDate && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Event Date & Time</span>
                    <span className="text-gray-200 font-medium">{details.eventDate} ({details.eventTime || "TBA"})</span>
                  </div>
                )}
                {details?.founderName && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Founder Name</span>
                    <span className="text-gray-200 font-medium">{details.founderName}</span>
                  </div>
                )}
                {details?.amount && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Amount Paid</span>
                    <span className="text-white font-extrabold">₹{details.amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Transaction ID</span>
                  <span className="text-gray-200 font-mono font-medium">{details?.txnID || "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Merchant Txn No</span>
                  <span className="text-gray-200 font-mono font-medium">{txnNo}</span>
                </div>
                {details?.paymentMode && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Payment Mode</span>
                    <span className="text-gray-200 font-medium">{details.paymentMode}</span>
                  </div>
                )}
                {details?.paymentDateTime && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Payment Time</span>
                    <span className="text-gray-200 font-medium">
                      {new Date(details.paymentDateTime).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-xs mb-8 leading-relaxed">
                Thank you for registering. We have reserved your seat. You will receive an email confirmation with your PDF receipt and calendar details shortly.
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-rose-500 mb-6 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                Payment Failed
              </h1>
              <p className="text-rose-400 text-sm font-semibold mb-6 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                Transaction Declined
              </p>

              <div className="w-full bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 mb-8 text-left flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-1">Reason for Failure</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium">
                    {details?.respDescription || reasonParam || "The payment transaction could not be processed. Please check your credentials or try a different payment method."}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3.5 w-full">
            {isSuccess && (
              <button
                onClick={() => window.open(`${API_URL}/payment/receipt/${txnNo}/download`, "_blank")}
                className="w-full flex items-center justify-center gap-1.5 bg-[#FFD700] hover:bg-[#E5C100] text-black text-[10px] font-extrabold uppercase tracking-wider px-3 py-3 rounded-xl transition-all shadow-lg hover:shadow-yellow-500/10 duration-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Receipt
              </button>
            )}

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => router.push("/events")}
                className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-3 rounded-xl border border-white/10 transition-all duration-200 cursor-pointer"
              >
                View Event Details
              </button>
              <button
                onClick={() => router.push("/events")}
                className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-3 rounded-xl border border-white/10 transition-all duration-200 cursor-pointer"
              >
                {!isSuccess ? "Try Again" : "Back to Events"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-12">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <Loader2 className="w-12 h-12 text-[#FFD700] animate-spin mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Loading</h2>
        </div>
      }>
        <PaymentStatusContent />
      </Suspense>
    </div>
  );
}
