import { DefaultSectionConfig, TemplateCategory } from '../entities/template.entity.js';

const heroContent = {
  title: 'ভর্তি পরীক্ষার প্রস্তুতি নাও সেরাদের সাথে',
  subtitle: 'Prepare for Admission Tests with the Best',
  description:
    'বাংলাদেশের সেরা শিক্ষকদের সাথে ইঞ্জিনিয়ারিং, মেডিকেল এবং বিশ্ববিদ্যালয় ভর্তি পরীক্ষার প্রস্তুতি নিন। আমাদের প্রমাণিত পদ্ধতিতে সাফল্য নিশ্চিত।',
  ctaText: 'এখনই ভর্তি হোন',
  ctaLink: '#contact',
  secondaryCtaText: 'বিস্তারিত জানুন',
  secondaryCtaLink: '#about',
  backgroundImage: '',
  stats: [
    { label: 'শিক্ষার্থী', value: '১০,০০০+' },
    { label: 'সাফল্যের হার', value: '৯৫%' },
    { label: 'অভিজ্ঞ শিক্ষক', value: '৫০+' },
  ],
};

const aboutContent = {
  title: 'আমাদের সম্পর্কে',
  subtitle: 'About Us',
  description:
    'আমরা ২০১৫ সাল থেকে বাংলাদেশের শিক্ষার্থীদের ভর্তি পরীক্ষার প্রস্তুতিতে সহায়তা করে আসছি। আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী এবং আধুনিক শিক্ষা পদ্ধতি শিক্ষার্থীদের সাফল্যের পথে এগিয়ে নিয়ে যায়।',
  mission:
    'প্রতিটি শিক্ষার্থীকে তাদের স্বপ্নের শিক্ষা প্রতিষ্ঠানে ভর্তি হতে সাহায্য করা।',
  vision:
    'বাংলাদেশের শিক্ষা খাতে একটি নির্ভরযোগ্য ও মানসম্মত প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া।',
  image: '',
  features: [
    {
      icon: 'book',
      title: 'মানসম্মত শিক্ষা',
      description: 'অভিজ্ঞ শিক্ষকদের দ্বারা পরিচালিত ক্লাস',
    },
    {
      icon: 'users',
      title: 'ছোট ব্যাচ',
      description: 'প্রতি ব্যাচে সর্বোচ্চ ৩০ জন শিক্ষার্থী',
    },
    {
      icon: 'target',
      title: 'লক্ষ্যভিত্তিক প্রস্তুতি',
      description: 'পরীক্ষার ধরন অনুযায়ী বিশেষ প্রস্তুতি',
    },
  ],
};

const coursesContent = {
  title: 'আমাদের কোর্সসমূহ',
  subtitle: 'Our Courses',
  description: 'আপনার লক্ষ্য অনুযায়ী সেরা কোর্স বেছে নিন',
  courses: [
    {
      title: 'ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি',
      titleEn: 'Engineering Admission Prep',
      description:
        'BUET, CUET, RUET সহ সকল ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার প্রস্তুতি। পদার্থবিজ্ঞান, রসায়ন, গণিত বিষয়ে বিশেষ ক্লাস।',
      duration: '৬ মাস',
      classes: '১৮০+ ক্লাস',
      price: '১৫,০০০',
      features: ['লাইভ ক্লাস', 'রেকর্ডেড ভিডিও', 'মডেল টেস্ট', 'প্রশ্ন ব্যাংক'],
      image: '',
    },
    {
      title: 'মেডিকেল ভর্তি প্রস্তুতি',
      titleEn: 'Medical Admission Prep',
      description:
        'মেডিকেল ও ডেন্টাল কলেজে ভর্তি পরীক্ষার সম্পূর্ণ প্রস্তুতি। জীববিজ্ঞান, পদার্থবিজ্ঞান, রসায়ন এবং সাধারণ জ্ঞান।',
      duration: '৬ মাস',
      classes: '২০০+ ক্লাস',
      price: '১৮,০০০',
      features: ['লাইভ ক্লাস', 'রেকর্ডেড ভিডিও', 'ডেইলি এক্সাম', 'মডেল টেস্ট'],
      image: '',
    },
    {
      title: 'বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি',
      titleEn: 'University Admission Prep',
      description:
        'ঢাকা, জাহাঙ্গীরনগর, রাজশাহী সহ সকল পাবলিক বিশ্ববিদ্যালয়ের ভর্তি প্রস্তুতি। বিজ্ঞান, মানবিক ও বাণিজ্য বিভাগের জন্য আলাদা ব্যাচ।',
      duration: '৪ মাস',
      classes: '১২০+ ক্লাস',
      price: '১২,০০০',
      features: ['লাইভ ক্লাস', 'ইউনিট ভিত্তিক প্রস্তুতি', 'মডেল টেস্ট', 'পিডিএফ নোট'],
      image: '',
    },
  ],
};

const admissionInfoContent = {
  title: 'ভর্তি তথ্য',
  subtitle: 'Admission Information',
  description: 'ভর্তি প্রক্রিয়া সম্পর্কে বিস্তারিত জানুন',
  steps: [
    {
      step: 1,
      title: 'অনলাইনে রেজিস্ট্রেশন',
      description: 'আমাদের ওয়েবসাইট থেকে অনলাইনে রেজিস্ট্রেশন ফর্ম পূরণ করুন।',
    },
    {
      step: 2,
      title: 'ফি প্রদান',
      description: 'বিকাশ, নগদ অথবা ব্যাংক ট্রান্সফারের মাধ্যমে কোর্স ফি প্রদান করুন।',
    },
    {
      step: 3,
      title: 'ব্যাচ নির্বাচন',
      description: 'আপনার সুবিধামতো সময়ের ব্যাচ নির্বাচন করুন।',
    },
    {
      step: 4,
      title: 'ক্লাস শুরু',
      description: 'নির্ধারিত তারিখে ক্লাস শুরু হবে। অনলাইন ও অফলাইন দুটি অপশন আছে।',
    },
  ],
  requirements: [
    'এইচএসসি পরীক্ষার্থী বা পাস',
    'জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন',
    'সদ্য তোলা পাসপোর্ট সাইজ ছবি',
    'পূর্ববর্তী পরীক্ষার ফলাফলের কপি',
  ],
  deadline: 'ভর্তি চলছে - আসন সীমিত!',
};

const successStoriesContent = {
  title: 'সাফল্যের গল্প',
  subtitle: 'Success Stories',
  description: 'আমাদের শিক্ষার্থীদের সাফল্যের কিছু গল্প',
  stories: [
    {
      name: 'রাফি আহমেদ',
      achievement: 'BUET - CSE (মেধা তালিকায় ১৫তম)',
      story:
        'এই প্রতিষ্ঠানের গাইডলাইন অনুসরণ করে আমি BUET-এ CSE বিভাগে ভর্তি হতে পেরেছি। শিক্ষকদের সাপোর্ট ছিল অসাধারণ।',
      image: '',
      year: '২০২৪',
    },
    {
      name: 'ফাতিমা খানম',
      achievement: 'ঢাকা মেডিকেল কলেজ',
      story:
        'মেডিকেল ভর্তি পরীক্ষায় ভালো করার পেছনে এই প্রতিষ্ঠানের বিশাল ভূমিকা আছে। ডেইলি এক্সাম আমার প্রস্তুতিকে শক্তিশালী করেছে।',
      image: '',
      year: '২০২৪',
    },
    {
      name: 'সাকিব হাসান',
      achievement: 'ঢাকা বিশ্ববিদ্যালয় - ব্যবসায় প্রশাসন',
      story:
        'বাণিজ্য বিভাগ থেকে ঢাকা বিশ্ববিদ্যালয়ে চান্স পেয়েছি এই প্রতিষ্ঠানের সহায়তায়। চমৎকার শিক্ষকমণ্ডলী।',
      image: '',
      year: '২০২৩',
    },
  ],
};

const facultyContent = {
  title: 'আমাদের শিক্ষকমণ্ডলী',
  subtitle: 'Our Faculty',
  description: 'অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকদের সাথে পরিচিত হোন',
  members: [
    {
      name: 'ড. আব্দুল করিম',
      designation: 'পদার্থবিজ্ঞান বিভাগ প্রধান',
      qualification: 'PhD, পদার্থবিজ্ঞান - ঢাকা বিশ্ববিদ্যালয়',
      experience: '১৫ বছরের অভিজ্ঞতা',
      image: '',
    },
    {
      name: 'প্রফেসর নাসরিন আক্তার',
      designation: 'রসায়ন বিভাগ প্রধান',
      qualification: 'MSc, রসায়ন - জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
      experience: '১২ বছরের অভিজ্ঞতা',
      image: '',
    },
    {
      name: 'মোঃ তানভীর ইসলাম',
      designation: 'গণিত বিশেষজ্ঞ',
      qualification: 'MSc, গণিত - BUET',
      experience: '১০ বছরের অভিজ্ঞতা',
      image: '',
    },
    {
      name: 'ড. ফারহানা রহমান',
      designation: 'জীববিজ্ঞান বিভাগ প্রধান',
      qualification: 'PhD, জীববিজ্ঞান - রাজশাহী বিশ্ববিদ্যালয়',
      experience: '১৩ বছরের অভিজ্ঞতা',
      image: '',
    },
  ],
};

const testimonialsContent = {
  title: 'শিক্ষার্থীদের মতামত',
  subtitle: 'What Students Say',
  description: 'আমাদের শিক্ষার্থীরা কী বলছে',
  testimonials: [
    {
      name: 'মাহমুদ হাসান',
      role: 'BUET Student',
      content:
        'এই প্রতিষ্ঠান আমার জীবন বদলে দিয়েছে। শিক্ষকদের আন্তরিকতা এবং পড়ানোর পদ্ধতি সত্যিই অসাধারণ। আমি সবাইকে এখানে পড়ার পরামর্শ দিব।',
      rating: 5,
      image: '',
    },
    {
      name: 'তাসনিম জাহান',
      role: 'DMC Student',
      content:
        'মেডিকেল ভর্তি পরীক্ষার প্রস্তুতির জন্য এটি সেরা প্রতিষ্ঠান। ডেইলি এক্সাম এবং মডেল টেস্ট আমার আত্মবিশ্বাস বাড়িয়েছে।',
      rating: 5,
      image: '',
    },
    {
      name: 'আরিফ রহমান',
      role: 'DU Student',
      content:
        'বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য চমৎকার প্রস্তুতি নিতে পেরেছি। ইউনিট ভিত্তিক ক্লাস খুবই কার্যকর ছিল।',
      rating: 4,
      image: '',
    },
  ],
};

const faqContent = {
  title: 'সচরাচর জিজ্ঞাসা',
  subtitle: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'কোর্সের সময়কাল কত?',
      answer:
        'কোর্সভেদে সময়কাল ভিন্ন হয়। ইঞ্জিনিয়ারিং ও মেডিকেল কোর্স ৬ মাস এবং বিশ্ববিদ্যালয় কোর্স ৪ মাস ব্যাপী।',
    },
    {
      question: 'অনলাইনে ক্লাস করা যাবে কি?',
      answer:
        'হ্যাঁ, আমরা অনলাইন ও অফলাইন দুটি মাধ্যমেই ক্লাস পরিচালনা করি। আপনি আপনার সুবিধামতো যেকোনো মাধ্যম বেছে নিতে পারেন।',
    },
    {
      question: 'পেমেন্ট কিভাবে করব?',
      answer:
        'বিকাশ, নগদ, রকেট অথবা যেকোনো ব্যাংকের মাধ্যমে পেমেন্ট করতে পারবেন। কিস্তিতে পেমেন্টের সুযোগও আছে।',
    },
    {
      question: 'রেকর্ডেড ক্লাস কি পাওয়া যায়?',
      answer:
        'হ্যাঁ, প্রতিটি লাইভ ক্লাসের রেকর্ডিং আপনার ড্যাশবোর্ডে আপলোড করা হয়। আপনি যেকোনো সময় দেখতে পারবেন।',
    },
    {
      question: 'ভর্তির শেষ তারিখ কবে?',
      answer:
        'প্রতি ব্যাচে আসন সীমিত। তাই যত দ্রুত সম্ভব ভর্তি হওয়ার পরামর্শ দেওয়া হচ্ছে। বর্তমানে ভর্তি চলছে।',
    },
  ],
};

const contactContent = {
  title: 'যোগাযোগ করুন',
  subtitle: 'Contact Us',
  description: 'যেকোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন',
  phone: '+880 1700-000000',
  email: 'info@example.com',
  address: 'বাড়ি ১২, রোড ৫, ধানমন্ডি, ঢাকা-১২০৫',
  mapEmbedUrl: '',
  socialLinks: {
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    whatsapp: '+8801700000000',
  },
  formFields: [
    { name: 'name', label: 'আপনার নাম', type: 'text', required: true },
    { name: 'phone', label: 'মোবাইল নম্বর', type: 'tel', required: true },
    { name: 'email', label: 'ইমেইল', type: 'email', required: false },
    { name: 'message', label: 'আপনার বার্তা', type: 'textarea', required: true },
  ],
};

const footerContent = {
  companyName: 'EdTech Academy',
  description: 'বাংলাদেশের সেরা ভর্তি পরীক্ষা প্রস্তুতি প্রতিষ্ঠান',
  copyright: '© ২০২৪ EdTech Academy. সর্বস্বত্ব সংরক্ষিত।',
  links: [
    { label: 'হোম', url: '#hero' },
    { label: 'আমাদের সম্পর্কে', url: '#about' },
    { label: 'কোর্সসমূহ', url: '#courses' },
    { label: 'যোগাযোগ', url: '#contact' },
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
  },
};

const featuresContent = {
  title: 'কেন আমাদের বেছে নেবেন?',
  subtitle: 'Why Choose Us?',
  features: [
    {
      icon: 'award',
      title: 'প্রমাণিত সাফল্য',
      description: '৯৫% এর বেশি শিক্ষার্থী তাদের লক্ষ্য অর্জন করেছে।',
    },
    {
      icon: 'monitor',
      title: 'অনলাইন ও অফলাইন',
      description: 'আপনার সুবিধামতো যেকোনো মাধ্যমে পড়ুন।',
    },
    {
      icon: 'file-text',
      title: 'সম্পূর্ণ স্টাডি ম্যাটেরিয়াল',
      description: 'নোট, প্রশ্ন ব্যাংক, মডেল টেস্ট সব এক জায়গায়।',
    },
    {
      icon: 'clock',
      title: '২৪/৭ সাপোর্ট',
      description: 'যেকোনো সমস্যায় আমরা সবসময় পাশে আছি।',
    },
    {
      icon: 'bar-chart',
      title: 'প্রগ্রেস ট্র্যাকিং',
      description: 'আপনার অগ্রগতি পর্যবেক্ষণ করুন এবং দুর্বলতা চিহ্নিত করুন।',
    },
    {
      icon: 'users',
      title: 'এক্সপার্ট শিক্ষক',
      description: 'দেশের সেরা শিক্ষকদের সাথে শিখুন।',
    },
  ],
};

const pricingContent = {
  title: 'কোর্স ফি',
  subtitle: 'Pricing Plans',
  description: 'আপনার বাজেট অনুযায়ী প্ল্যান বেছে নিন',
  plans: [
    {
      name: 'বেসিক',
      nameEn: 'Basic',
      price: '৳৮,০০০',
      duration: '৪ মাস',
      features: [
        'রেকর্ডেড ভিডিও ক্লাস',
        'পিডিএফ নোট',
        'মডেল টেস্ট (সীমিত)',
        'অনলাইন সাপোর্ট',
      ],
      isPopular: false,
      ctaText: 'ভর্তি হোন',
    },
    {
      name: 'স্ট্যান্ডার্ড',
      nameEn: 'Standard',
      price: '৳১৫,০০০',
      duration: '৬ মাস',
      features: [
        'লাইভ + রেকর্ডেড ক্লাস',
        'সম্পূর্ণ স্টাডি ম্যাটেরিয়াল',
        'আনলিমিটেড মডেল টেস্ট',
        'ডেইলি এক্সাম',
        'ডাউট ক্লিয়ারিং সেশন',
      ],
      isPopular: true,
      ctaText: 'ভর্তি হোন',
    },
    {
      name: 'প্রিমিয়াম',
      nameEn: 'Premium',
      price: '৳২৫,০০০',
      duration: '৮ মাস',
      features: [
        'সকল স্ট্যান্ডার্ড সুবিধা',
        'ওয়ান-টু-ওয়ান মেন্টরশিপ',
        'ব্যক্তিগত স্টাডি প্ল্যান',
        'অফলাইন ক্লাস অ্যাক্সেস',
        'পরীক্ষার আগে স্পেশাল ব্যাচ',
        'গ্যারান্টিড রিটেক',
      ],
      isPopular: false,
      ctaText: 'ভর্তি হোন',
    },
  ],
};

const ctaContent = {
  title: 'আজই শুরু করুন আপনার প্রস্তুতি!',
  subtitle: "Start Your Preparation Today!",
  description:
    'আর দেরি নয়! এখনই ভর্তি হোন এবং আপনার স্বপ্নের প্রতিষ্ঠানে চান্স পাওয়ার যাত্রা শুরু করুন।',
  ctaText: 'এখনই ভর্তি হোন',
  ctaLink: '#contact',
  secondaryText: 'ফ্রি কাউন্সেলিং পেতে কল করুন',
  phone: '+880 1700-000000',
};

const statsContent = {
  title: 'আমাদের অর্জন',
  subtitle: 'Our Achievements',
  stats: [
    { value: '১০,০০০+', label: 'শিক্ষার্থী', icon: 'users' },
    { value: '৯৫%', label: 'সাফল্যের হার', icon: 'trending-up' },
    { value: '৫০+', label: 'অভিজ্ঞ শিক্ষক', icon: 'award' },
    { value: '৮+', label: 'বছরের অভিজ্ঞতা', icon: 'calendar' },
  ],
};

const galleryContent = {
  title: 'ফটো গ্যালারি',
  subtitle: 'Photo Gallery',
  description: 'আমাদের প্রতিষ্ঠান ও কার্যক্রমের কিছু মুহূর্ত',
  images: [
    { url: '', caption: 'ক্লাসরুম', category: 'campus' },
    { url: '', caption: 'সেমিনার হল', category: 'campus' },
    { url: '', caption: 'লাইব্রেরি', category: 'campus' },
    { url: '', caption: 'বার্ষিক পুরস্কার বিতরণী', category: 'events' },
    { url: '', caption: 'শিক্ষা সফর', category: 'events' },
    { url: '', caption: 'বিজ্ঞান মেলা', category: 'events' },
  ],
  categories: ['all', 'campus', 'events'],
};

function buildSections(
  sectionTypes: string[],
): DefaultSectionConfig[] {
  const contentMap: Record<string, Record<string, any>> = {
    hero: heroContent,
    about: aboutContent,
    courses: coursesContent,
    admission_info: admissionInfoContent,
    success_stories: successStoriesContent,
    faculty: facultyContent,
    testimonials: testimonialsContent,
    faq: faqContent,
    contact: contactContent,
    footer: footerContent,
    features: featuresContent,
    pricing: pricingContent,
    cta: ctaContent,
    stats: statsContent,
    gallery: galleryContent,
  };

  return sectionTypes.map((type, index) => ({
    sectionType: type,
    designVariant: 1,
    order: index + 1,
    defaultContent: contentMap[type] || {},
  }));
}

export interface TemplateSeedData {
  name: string;
  description: string;
  thumbnail?: string;
  category: TemplateCategory;
  defaultSections: DefaultSectionConfig[];
}

export const templateSeeds: TemplateSeedData[] = [
  {
    name: 'Admission Pro',
    description:
      'ভর্তি পরীক্ষা কোচিং সেন্টারের জন্য পূর্ণাঙ্গ টেমপ্লেট। ভর্তি তথ্য, কোর্স, সাফল্যের গল্প সহ সকল প্রয়োজনীয় সেকশন।',
    thumbnail: undefined,
    category: TemplateCategory.ADMISSION,
    defaultSections: buildSections([
      'hero',
      'about',
      'courses',
      'admission_info',
      'success_stories',
      'faculty',
      'testimonials',
      'faq',
      'contact',
      'footer',
    ]),
  },
  {
    name: 'Coaching Center',
    description:
      'কোচিং সেন্টারের জন্য আদর্শ টেমপ্লেট। পরিসংখ্যান, মূল্য তালিকা এবং শিক্ষকদের তথ্য সহ।',
    thumbnail: undefined,
    category: TemplateCategory.COACHING,
    defaultSections: buildSections([
      'hero',
      'about',
      'courses',
      'stats',
      'faculty',
      'testimonials',
      'pricing',
      'faq',
      'contact',
      'footer',
    ]),
  },
  {
    name: 'Landing Express',
    description:
      'দ্রুত ল্যান্ডিং পেজ তৈরির জন্য হালকা ও কার্যকর টেমপ্লেট। কম সেকশনে সর্বোচ্চ প্রভাব।',
    thumbnail: undefined,
    category: TemplateCategory.LANDING,
    defaultSections: buildSections([
      'hero',
      'features',
      'stats',
      'pricing',
      'testimonials',
      'cta',
      'contact',
      'footer',
    ]),
  },
  {
    name: 'Premium Institute',
    description:
      'প্রিমিয়াম শিক্ষা প্রতিষ্ঠানের জন্য সম্পূর্ণ টেমপ্লেট। গ্যালারি সহ সকল সেকশন।',
    thumbnail: undefined,
    category: TemplateCategory.PREMIUM,
    defaultSections: buildSections([
      'hero',
      'about',
      'gallery',
      'courses',
      'admission_info',
      'success_stories',
      'faculty',
      'testimonials',
      'faq',
      'contact',
      'footer',
    ]),
  },
];
