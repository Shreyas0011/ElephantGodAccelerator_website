"use client";

import React from "react";
import { Rocket, Briefcase, Store, User } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: string;
  onChange: (role: string) => void;
  label?: string;
}

export default function RoleSelector({
  selectedRole,
  onChange,
  label = "Select Registration Category *",
}: RoleSelectorProps) {
  const roles = [
    { id: "Startup", label: "Startup", icon: Rocket },
    { id: "Investor", label: "Investor", icon: Briefcase },
    { id: "Exhibitor", label: "Exhibitor", icon: Store },
    { id: "Delegate", label: "Delegate", icon: User },
  ];

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3.5">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onChange(role.id)}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 gap-2 cursor-pointer ${
                isSelected
                  ? "bg-gold/15 border-gold text-gold shadow-[0_0_15px_rgba(240,201,128,0.15)] font-bold scale-[1.02]"
                  : "bg-bg-surface/50 border-gray-300 dark:border-white/10 text-gray-500 hover:border-gold/50 hover:bg-gold/5 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${
                isSelected ? "text-gold scale-110" : "text-gray-400 group-hover:text-gold"
              }`} />
              <span className="text-xs sm:text-sm uppercase tracking-wider font-extrabold">{role.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
