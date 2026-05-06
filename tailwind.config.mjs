/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "1.25rem",
				lg: "2rem",
				xl: "2.5rem",
				"2xl": "3rem",
			},
			screens: {
				"2xl": "1200px",
			},
		},
		extend: {
			fontFamily: {
				serif: [
					'Playfair Display',
					'serif'
				],
				sans: [
					'"Inter Variable"',
					'system-ui',
					'sans-serif'
				],
				display: [
					'"Instrument Serif"',
					'Georgia',
					'serif'
				],
				luxury: [
					'Cormorant Garamond',
					'serif'
				],
				mono: [
					'"JetBrains Mono Variable"',
					'ui-monospace',
					'monospace'
				]
			},
			colors: {
				light: {
					bg: '#F9F9F9',
					textPrimary: '#2D2D2D',
					textSecondary: '#5F5F5F',
					accent: '#B8860B',
					surface: '#FFFFFF'
				},
				dark: {
					bg: '#121212',
					textPrimary: '#E5E4E2', // Platinum/Silver
					textSecondary: '#A3A3A3', // Muted Silver
					accent: '#D4AF37', // Metallic Gold
					surface: '#1E1E1E'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: '#9C9384', // Overridden for Digital Atelier token
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: {
					DEFAULT: 'hsl(var(--border))', // Preserve existing shadcn border utility
					soft: "rgba(255, 255, 255, 0.08)",
					medium: "rgba(255, 255, 255, 0.14)",
					gold: "rgba(199, 167, 108, 0.34)",
				},
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				// Digital Atelier Final Tokens
				obsidian: "#070707",
				charcoal: "#0E0E0C",
				surface: "#151411",
				elevated: "#1B1915",
				ivory: "#F7F0E6",
				bone: "#D8CDBB",
				gold: {
					DEFAULT: "#C7A76C",
					soft: "#F0D49A",
					deep: "#8B6A35",
				},
				teal: {
					deep: "#173B35",
					mist: "#8FD7C7",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				"4xl": "2rem",
				"5xl": "2.5rem",
			},
			boxShadow: {
				soft: "0 24px 80px rgba(0, 0, 0, 0.32)",
				gold: "0 24px 80px rgba(199, 167, 108, 0.12)",
				card: "0 18px 60px rgba(0, 0, 0, 0.28)",
				inset: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
			},
			backgroundImage: {
				"hero-gradient":
					"radial-gradient(circle at 78% 18%, rgba(199, 167, 108, 0.18), transparent 32%), radial-gradient(circle at 18% 22%, rgba(23, 59, 53, 0.42), transparent 34%), linear-gradient(145deg, #070707 0%, #0E0E0C 48%, #151411 100%)",
				"card-gradient":
					"linear-gradient(145deg, rgba(247, 240, 230, 0.07), rgba(199, 167, 108, 0.025))",
				"border-gradient":
					"linear-gradient(135deg, rgba(199, 167, 108, 0.55), rgba(247, 240, 230, 0.10), rgba(143, 215, 199, 0.16))",
				"cta-gradient":
					"linear-gradient(135deg, #F0D49A 0%, #C7A76C 42%, #8B6A35 100%)",
			},
			letterSpacing: {
				tighter: "-0.04em",
				tight: "-0.025em",
				wide: "0.08em",
				wider: "0.12em",
			},
			transitionTimingFunction: {
				premium: "cubic-bezier(0.22, 1, 0.36, 1)",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
