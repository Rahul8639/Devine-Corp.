# 🖥️ Divine - Tech Hardware E-commerce Platform

A modern, full-stack e-commerce web application built for selling premium tech hardware products including keyboards, mice, gaming gear, and computer peripherals.

![Divine Tech Store](https://img.shields.io/badge/Divine-Tech%20Store-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🛍️ **E-commerce Capabilities**
- **Product Showcase**: Video-based product cards with interactive controls
- **Category Management**: Organized product categorization and carousels
- **Featured Products**: Highlighted sections for premium items
- **Interactive Comparisons**: Before/after sliders for product features
- **Responsive Design**: Mobile-first approach for all devices

### 🔐 **Authentication & Security**
- **User Authentication**: Supabase-powered login/signup system
- **Role-based Access**: Admin and user role management
- **OAuth Integration**: Google sign-in support
- **Password Recovery**: Secure email-based password reset
- **Protected Routes**: Secure access control

### 🎨 **User Experience**
- **Smooth Animations**: Framer Motion and GSAP integration
- **Interactive Elements**: Drag-and-drop, hover effects, smooth scrolling
- **Video Content**: Product demonstration videos with controls
- **Parallax Effects**: Engaging scroll-based animations
- **Professional UI**: Premium design for tech hardware sales

### 📱 **Responsive & Performance**
- **Mobile Optimized**: Touch-friendly interactions
- **Fast Loading**: Optimized assets and lazy loading
- **SEO Ready**: Next.js optimization features
- **Accessibility**: WCAG compliant design patterns

## 🚀 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### **Animation & UX**
- **Framer Motion** - Production-ready motion library
- **GSAP** - Professional-grade animations
- **Lenis** - Smooth scrolling experience
- **Remix Icons** - Beautiful iconography

### **Backend & Database**
- **Supabase** - Open-source Firebase alternative
- **PostgreSQL** - Reliable database backend
- **Real-time Auth** - Built-in authentication system

### **Development Tools**
- **ESLint** - Code quality enforcement
- **PostCSS** - CSS processing
- **Hot Reload** - Fast development experience

## 📁 Project Structure

```
divine/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── auth/              # Authentication pages
│   │   └── page.tsx           # Homepage
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # Base UI components
│   │   ├── Hero.tsx           # Hero section
│   │   ├── ProductCard.tsx    # Product display
│   │   └── ...                # Other components
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── styles/                 # Assets and styling
├── public/                     # Static assets
│   ├── assets/                # Images, videos, fonts
│   └── ...                    # Other public files
└── package.json                # Dependencies and scripts
```

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/divine.git
cd divine
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **4. Run Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint

## 🔧 Configuration

### **Supabase Setup**
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Add them to your `.env.local` file
4. Set up authentication providers in Supabase dashboard

### **Admin Access**
To access admin features, use the email: `rahulprasad9779@gmail.com`

## 📱 Features in Detail

### **Product Management**
- **Video Products**: Upload and manage product demonstration videos
- **Image Galleries**: High-quality product photography
- **Category Organization**: Logical product grouping
- **Featured Sections**: Highlight premium products

### **User Experience**
- **Personalized Greeting**: User-specific welcome messages
- **Interactive Shopping**: Drag, scroll, and explore products
- **Smooth Navigation**: Lenis-powered smooth scrolling
- **Mobile Optimization**: Touch-friendly interactions

### **Admin Panel**
- **Content Management**: Control product displays and sliders
- **User Management**: Monitor user activity and roles
- **Analytics**: Track sales and user engagement

## 🌟 Key Components

- **`Hero.tsx`** - Main landing section with personalized content
- **`ProductCard.tsx`** - Interactive product display with video support
- **`BeforeAfterSlider.tsx`** - Product comparison tool
- **`CategoryCarousel.tsx`** - Product category navigation
- **`ParalaxText.tsx`** - Engaging scroll animations

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm run build
vercel --prod
```

### **Other Platforms**
- **Netlify**: Connect your GitHub repository
- **Railway**: Deploy with database integration
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### **Open Source Libraries**
- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Supabase](https://supabase.com/)** - Open source Firebase alternative
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation library
- **[Lenis](https://studiofreight.com/lenis/)** - Smooth scrolling library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### **Design Resources**
- **[Remix Icons](https://remixicon.com/)** - Beautiful iconography
- **Custom Fonts**: Gilroy, Helvetica Now Display, Neue Machina, Broca Regular

### **Development Tools**
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[ESLint](https://eslint.org/)** - Code quality enforcement
- **[PostCSS](https://postcss.org/)** - CSS processing tools

### **Special Thanks**
- **Next.js Team** - For the amazing framework
- **Supabase Community** - For the excellent backend solution
- **Open Source Contributors** - For making the web better
- **Tech Hardware Community** - For inspiring this platform

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/divine/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/divine/discussions)
- **Email**: [Contact Support](mailto:support@divine.com)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/divine&type=Date)](https://star-history.com/#yourusername/divine&Date)

---

<div align="center">
  <p>Made with ❤️ for the tech community</p>
  <p>Built with Next.js, Supabase, and modern web technologies</p>
</div>
