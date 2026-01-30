import React, { createContext, useContext, useMemo, useState } from "react";

/** ปรับตามข้อมูลจริงของคุณได้ */
export type Organization = {
  id: string;
  name: string;
  domain: string;
};

type OrganizationContextValue = {
  /** org ปัจจุบัน */
  org: Organization | null;

  /** รายการ org (ถ้ายังไม่ใช้ ก็ปล่อยเป็น []) */
  organizations: Organization[];

  /** สถานะโหลด (ไว้ต่อ API ภายหลัง) */
  isOrgLoading: boolean;

  /** ตั้งค่า org ปัจจุบัน */
  setOrg: (next: Organization | null) => void;

  /** ตั้งค่ารายการ org และ auto-set org ตัวแรกถ้า org ยังว่าง */
  setOrganizations: (orgs: Organization[]) => void;

  /** เลือก org จาก id */
  setOrgById: (orgId: string) => void;

  /** ล้างข้อมูล org ทั้งหมด */
  clearOrg: () => void;
};

const OrganizationContext = createContext<OrganizationContextValue | undefined>(
  undefined
);

export function OrganizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [org, setOrgState] = useState<Organization | null>(null);
  const [organizations, setOrganizationsState] = useState<Organization[]>([]);
  const [isOrgLoading] = useState<boolean>(false); // ยังไม่ต่อ API เลย fix ไว้ก่อน

  const setOrg = (next: Organization | null) => {
    setOrgState(next);
  };

  const setOrganizations = (orgs: Organization[]) => {
    setOrganizationsState(orgs);

    // ถ้ายังไม่เคยเลือก org ให้ default เป็นตัวแรก (กันหน้า crash)
    if (!org && orgs.length > 0) {
      setOrgState(orgs[0]);
    }
  };

  const setOrgById = (orgId: string) => {
    const found = organizations.find((o) => o.id === orgId) || null;
    setOrgState(found);
  };

  const clearOrg = () => {
    setOrganizationsState([]);
    setOrgState(null);
  };

  const value = useMemo<OrganizationContextValue>(
    () => ({
      org,
      organizations,
      isOrgLoading,
      setOrg,
      setOrganizations,
      setOrgById,
      clearOrg,
    }),
    [org, organizations, isOrgLoading]
  );

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

/** ใช้ในทุกหน้า: const { org } = useOrganization(); */
export function useOrganization() {
  const ctx = useContext(OrganizationContext);
  if (!ctx) {
    throw new Error("useOrganization must be used within OrganizationProvider");
  }
  return ctx;
}
