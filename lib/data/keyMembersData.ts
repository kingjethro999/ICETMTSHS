export interface KeyMember {
  id: string;
  name: string;
  credentials?: string;
  role: string;
  institution: string;
  imageUrl: string;
  bio: string;
}

export const keyMembersData: KeyMember[] = [
  {
    id: "bibi-florina",
    name: "Prof. Datuk Dr. Hajjah Bibi Florina Abdullah",
    role: "Pro-Chancellor",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Prof. Datuk Dr. Hjh. Bibi Florina Binti Abdullah, the Pro-Chancellor of Lincoln University College, Nigeria, has a distinguished career in global healthcare leadership. She has served as a Director of Nursing and Registrar with extensive experience in international nursing standards. She has been instrumental in professionalizing nursing education and transforming healthcare systems from diploma to degree levels, bringing a wealth of expertise to Lincoln University College, Nigeria.",
  },
  {
    id: "amiya-bhaumik",
    name: "Prof. Dr. Amiya Bhaumik",
    role: "President",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Amiya Bhaumik, Founder & President of Lincoln University College, Nigeria, is a globally recognized educationalist. She has served as an Executive Vice President of international education consulting groups and as a Research Fellow at UNESCO in Paris. Having extensively traveled across Europe, Africa, and Asia, she brings a truly global perspective to higher education. Her academic leadership spans multiple countries, fostering excellence in research and innovation.",
  },
  {
    id: "mohd-yusoff",
    name: "Dato (Amb) Dr. Mohd Yusoff Bin A. Bakar",
    role: "Vice Chancellor & CEO",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    bio: "Dato (Amb) Dr. Mohd Yusoff Bin A. Bakar is the Vice Chancellor and Chief Executive Officer of Lincoln University College, Nigeria. A former Ambassador with over 20 years of diplomatic service, he brings unparalleled leadership and administrative expertise. He has volunteered as Chairman of international charity organizations focused on humanitarian relief and has been a driving force in educational management and student affairs excellence.",
  },
  {
    id: "hafizah",
    name: "Prof. Datin Dr. Hafizah Che Hassan",
    role: "Deputy Vice Chancellor (Academic)",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    bio: "Prof. Datin Dr. Hafizah is the Deputy Vice Chancellor (Academic) at Lincoln University College, Nigeria. With over 30 years as an educator, she specialized in Renal Nursing and holds advanced degrees in Nursing and Health Sciences from prestigious international institutions in Australia and Europe. She has extensive experience in both undergraduate and postgraduate healthcare education and is a recognized auditor for professional nursing standards and academic quality.",
  },
  {
    id: "zarina-awang",
    name: "Prof. Dr. Zarina Awang",
    role: "Dean, Faculty of Medicine",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400",
    bio: "Prof. Dr. Zarina Awang leads the Faculty of Medicine at Lincoln University College, Nigeria. Holding an MD and specialized certifications in Healthcare Management from the UK, she is a renowned expert in Pharmacology and Therapeutics. She is an instructor trainer for Basic and Advanced Cardiac Life Support and has dedicated her career to advancing medical education in the fields of Anaesthesia, Emergency Medicine, and Clinical Pharmacology.",
  },
  {
    id: "zulkarnain",
    name: "Prof. Dr. Zulkarnain A. Hatta",
    role: "Dean, Faculty of Social Sciences, Arts and Humanities",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    bio: "Prof. Dr. Zulkarnain A. Hatta is a Professor in Social Work with nearly four decades of academic experience. He holds a Doctor of Social Work from Howard University, USA, and has served as President of the Asian and Pacific Association for Social Work Education. His leadership roles in international associations have shaped global social work education and policy, making him a cornerstone of the academic community at Lincoln University College, Nigeria.",
  },
  {
    id: "jamaludin",
    name: "Dato' Ir Jamaludin Bin Non",
    role: "Board Member",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    bio: "Dato' Ir Jamaludin Bin Non is a senior Board Member at Lincoln University College, Nigeria. An engineering graduate from the University of Queensland, Australia, he has decades of experience in high-rise construction and site management. Having successfully managed construction projects worth hundreds of millions of dollars, he brings strategic industrial insight and a track record of tenacity and success to the institution's advisory board.",
  },
  {
    id: "faridah",
    name: "Professor Dr. Faridah Mohd Said",
    credentials: "RN, Midwife, PHN, MSPH, PhD",
    role: "Faculty of Nursing",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    bio: "Professor Dr. Faridah Mohd Said is a key faculty member at the Faculty of Nursing, Lincoln University College, Nigeria. With a PhD and extensive clinical experience in public health nursing across Saudi Arabia and Africa, she is an expert in E-Health Promotion and Quality Improvement Programs. She was an Erasmus Mundus Scholarship recipient and continues to lead research initiative in community health and nursing education.",
  },
  {
    id: "mazlan",
    name: "Datuk Dr. Hj. Mazlan Hj. Ahmad",
    credentials: "CA, FCIS, CS, CGP, MBA, DBA",
    role: "Professor of Practice / Corporate Leader",
    institution: "International Centre for Excellence in Finance",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    bio: "Datuk Dr. Hj. Mazlan Hj. Ahmad is a distinguished corporate leader and governance expert. Founder of several international conglomerates, he serves as a Professor of Practice with deep expertise in banking, financial regulation, and blockchain technology. He is a pioneer in social finance reform and digital governance, holding advanced degrees from prestigious institutions in Poland and the Netherlands.",
  },
  {
    id: "smitha",
    name: "Dr. Smitha Madhavan",
    role: "Dean, School of Health & Applied Science · Director of International Placement and Education",
    institution: "Lincoln University College, Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    bio: "Assoc. Professor Dr. Smitha Madhavan serves as Dean of the School of Health & Applied Science and Director of International Placement at Lincoln University College, Nigeria. Affiliated with 15 professional international associations and the recipient of numerous research awards, she has published over 30 scientific articles in globally indexed journals. Her career is dedicated to fostering international educational partnerships and clinical instruction excellence.",
  },
];
