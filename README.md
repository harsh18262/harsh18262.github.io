# DevOps Portfolio - Harshwardhan Mehrotra

A terminal-inspired, Kubernetes-themed DevOps portfolio website showcasing deep technical expertise through stunning animations and interactive elements.

## 🚀 Features

- **Terminal/CLI Aesthetic**: Dark background with matrix-green, cyan, and amber terminal colors
- **Kubernetes Theme**: Pod-like content blocks, kubectl commands, and YAML-formatted displays
- **Interactive Homelab Showcase**: 3-node cluster visualization with real-time metrics
- **Stunning Animations**: Particle effects, parallax scrolling, and smooth transitions
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Next.js 14**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide Icons**: Beautiful icon set

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devops-portfolio.git
cd devops-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 🚀 Deployment

This project is optimized for deployment on:
- **Vercel**: Push to GitHub and connect to Vercel
- **Netlify**: Similar GitHub integration
- **Docker**: Containerized deployment
- **Kubernetes**: For the true DevOps experience!

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-portfolio
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devops-portfolio
  template:
    metadata:
      labels:
        app: devops-portfolio
    spec:
      containers:
      - name: portfolio
        image: your-registry/devops-portfolio:latest
        ports:
        - containerPort: 3000
```

## 📝 Customization

1. **Update Personal Information**: Edit the content in each component file
2. **Change Colors**: Modify the color scheme in `tailwind.config.js`
3. **Add/Remove Sections**: Update `src/pages/index.tsx`
4. **Modify Animations**: Adjust Framer Motion settings in components

## 🎨 Color Scheme

- Terminal Green: `#00FF00`
- Terminal Cyan: `#00FFFF`
- Terminal Amber: `#FFB000`
- Terminal Purple: `#BD93F9`
- Terminal Pink: `#FF79C6`

## 📄 License

MIT License

## 👨‍💻 Author

Harshwardhan Mehrotra - Senior DevOps Engineer
