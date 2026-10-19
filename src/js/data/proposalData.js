export const proposalData = {
  grandTotal: 12616000,
  formattedGrandTotal: "₹1,26,16,000",
  // Backward compatibility aliases
  totalEstimate: 12616000,
  formattedTotal: "₹1,26,16,000",
  civilSubtotal: 7616000,
  formattedCivilSubtotal: "₹76,16,000",
  pradhistaSubtotal: 5000000,
  formattedPradhistaSubtotal: "₹50,00,000",
  engineer: {
    name: "Er. K. Sundararajan",
    regNo: "038/LS/2019/00015",
    qualification: "D.C.E., M.I.S.T.E.",
    role: "Licensed Building Surveyor & Consulting Civil Engineer",
    address: "Shree Nilayam, 55 Jain Street, Sevoor, Arni, Tiruvannamalai Dt. - 632301",
    phone: "9486370724"
  },
  packages: [
    {
      id: "pkg_1",
      titleKey: "pkg_1_title",
      subtitleKey: "pkg_1_subtitle",
      total: 3160000,
      formattedTotal: "₹31,60,000",
      pdf: "/assets/docs/estimate_1_temple_renovation.pdf",
      items: [
        { id: 1, descKey: "pkg_1_item_1", qty: "700 m", rate: "₹1,557 / m", amount: 1090000, formattedAmount: "₹10,90,000" },
        { id: 2, descKey: "pkg_1_item_2", qty: "1 Temple", rate: "Lump Sum", amount: 503000, formattedAmount: "₹5,03,000" },
        { id: 3, descKey: "pkg_1_item_3", qty: "1 Gopuram", rate: "Lump Sum", amount: 356000, formattedAmount: "₹3,56,000" },
        { id: 4, descKey: "pkg_1_item_4", qty: "1 Terrace", rate: "Lump Sum", amount: 232000, formattedAmount: "₹2,32,000" },
        { id: 5, descKey: "pkg_1_item_5", qty: "Pragaram", rate: "Lump Sum", amount: 896000, formattedAmount: "₹8,96,000" },
        { id: 6, descKey: "pkg_1_item_6", qty: "Front Entrance", rate: "Lump Sum", amount: 83000, formattedAmount: "₹83,000" }
      ]
    },
    {
      id: "pkg_2",
      titleKey: "pkg_2_title",
      subtitleKey: "pkg_2_subtitle",
      total: 1861000,
      formattedTotal: "₹18,61,000",
      pdf: "/assets/docs/estimate_2_muni_maharaj_guest_house.pdf",
      specs: {
        maharajRoom: "12'0\" x 12'0\" (with attached WC/Bath)",
        mathajiRoom: "11'3\" x 12'0\" (with attached WC/Bath)",
        guestRoom: "10'0\" x 9'0\"",
        kitchen: "8'0\" x 12'0\"",
        verandah: "23'0\" x 6'0\" (with 23' x 6' shed)",
        prochanaHall: "44'0\" x 50'0\" (GI Sheet Roof Area)"
      },
      items: [
        { id: 1, descKey: "pkg_2_item_1", detail: "12'0\" x 12'0\" with attached WC/Bath", qty: "144 sq.ft", rate: "Estimate", amount: 350000, formattedAmount: "₹3,50,000" },
        { id: 2, descKey: "pkg_2_item_2", detail: "11'3\" x 12'0\" with attached WC/Bath", qty: "135 sq.ft", rate: "Estimate", amount: 325000, formattedAmount: "₹3,25,000" },
        { id: 3, descKey: "pkg_2_item_3", detail: "10'0\" x 9'0\"", qty: "90 sq.ft", rate: "Estimate", amount: 220000, formattedAmount: "₹2,20,000" },
        { id: 4, descKey: "pkg_2_item_4", detail: "8'0\" x 12'0\"", qty: "96 sq.ft", rate: "Estimate", amount: 200000, formattedAmount: "₹2,00,000" },
        { id: 5, descKey: "pkg_2_item_5", detail: "23'0\" x 6'0\" with shed", qty: "276 sq.ft", rate: "Estimate", amount: 180000, formattedAmount: "₹1,80,000" },
        { id: 6, descKey: "pkg_2_item_6", detail: "44'0\" x 50'0\" GI sheet roof", qty: "2,200 sq.ft", rate: "Estimate", amount: 350000, formattedAmount: "₹3,50,000" },
        { id: 7, descKey: "pkg_2_item_7", detail: "RCC columns, vitrified tiles, septic tank, electrical & 6\" borewell", qty: "Structure & Services", rate: "Estimate", amount: 236000, formattedAmount: "₹2,36,000" }
      ]
    },
    {
      id: "pkg_3",
      titleKey: "pkg_3_title",
      subtitleKey: "pkg_3_subtitle",
      total: 2595000,
      formattedTotal: "₹25,95,000",
      pdf: "/assets/docs/estimate_3_multipurpose_hall.pdf",
      specs: {
        hallArea: "2,200 sq.ft (50' x 44')",
        columns: "21 RCC Columns",
        roof: "Tata Roof Sheets on Structural Steel Truss",
        flooring: "2x2 Vitrified Tiles"
      },
      items: [
        { id: 1, descKey: "pkg_3_item_1", detail: "2,200 sq.ft (50' x 44') Hall Area", qty: "2,200 sq.ft", rate: "Estimate", amount: 750000, formattedAmount: "₹7,50,000" },
        { id: 2, descKey: "pkg_3_item_2", detail: "21 RCC Columns & Plinth Foundation", qty: "21 Columns", rate: "Estimate", amount: 620000, formattedAmount: "₹6,20,000" },
        { id: 3, descKey: "pkg_3_item_3", detail: "Tata Sheet Roof on Steel Truss", qty: "Truss + Sheets", rate: "Estimate", amount: 520000, formattedAmount: "₹5,20,000" },
        { id: 4, descKey: "pkg_3_item_4", detail: "2x2 Vitrified Tiles on Concrete Bed", qty: "Flooring Area", rate: "Estimate", amount: 380000, formattedAmount: "₹3,80,000" },
        { id: 5, descKey: "pkg_3_item_5", detail: "Woodwork, Emulsion Paint, Electrical & Grill Gates", qty: "Finishing & Services", rate: "Estimate", amount: 325000, formattedAmount: "₹3,25,000" }
      ]
    },
    {
      id: "pkg_4",
      titleKey: "pkg_4_title",
      subtitleKey: "pkg_4_subtitle",
      badgeKey: "pkg_4_badge",
      total: 5000000,
      formattedTotal: "₹50,00,000",
      isCeremonialEstimate: true,
      items: [
        {
          id: 1,
          descKey: "pkg_4_item_1",
          detail: "5 Days Continuous Annadanam & devotee arrangements",
          qty: "5 Days",
          rate: "Estimate",
          amount: 3000000,
          formattedAmount: "₹30,00,000"
        },
        {
          id: 2,
          descKey: "pkg_4_item_2",
          detail: "Vidhan, Homam, Pooja Sacred Items & Samagri",
          qty: "Pooja Samagri",
          rate: "Estimate",
          amount: 1000000,
          formattedAmount: "₹10,00,000"
        },
        {
          id: 3,
          descKey: "pkg_4_item_3",
          detail: "Pandhal, Stage, Lighting, Sound System, Generator Rent & General Logistics",
          qty: "Event Setup",
          rate: "Estimate",
          amount: 1000000,
          formattedAmount: "₹10,00,000"
        }
      ]
    }
  ],
  // Flat items array for backward compatibility with existing proposal table
  items: [
    { id: 1, descKey: "pkg_1_item_1", qty: "700 m", rate: "₹1,557 / m", amount: 1090000, formattedAmount: "₹10,90,000" },
    { id: 2, descKey: "pkg_1_item_2", qty: "1 Temple", rate: "Lump Sum", amount: 503000, formattedAmount: "₹5,03,000" },
    { id: 3, descKey: "pkg_1_item_3", qty: "1 Gopuram", rate: "Lump Sum", amount: 356000, formattedAmount: "₹3,56,000" },
    { id: 4, descKey: "pkg_1_item_4", qty: "1 Terrace", rate: "Lump Sum", amount: 232000, formattedAmount: "₹2,32,000" },
    { id: 5, descKey: "pkg_1_item_5", qty: "Pragaram", rate: "Lump Sum", amount: 896000, formattedAmount: "₹8,96,000" },
    { id: 6, descKey: "pkg_1_item_6", qty: "Front Entrance", rate: "Lump Sum", amount: 83000, formattedAmount: "₹83,000" },
    { id: 7, descKey: "pkg_2_title", qty: "Guest House", rate: "Sub-package", amount: 1861000, formattedAmount: "₹18,61,000" },
    { id: 8, descKey: "pkg_3_title", qty: "Community Hall", rate: "Sub-package", amount: 2595000, formattedAmount: "₹25,95,000" },
    { id: 9, descKey: "pkg_4_title", qty: "Panchakalyana Pradhista", rate: "5 Days Estimate", amount: 5000000, formattedAmount: "₹50,00,000" }
  ]
};
