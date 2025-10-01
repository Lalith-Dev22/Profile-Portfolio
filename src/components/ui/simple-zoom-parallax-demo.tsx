'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Layers, Eye, Star, Rocket, Globe, Code, Palette, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis'
import { ZoomParallax } from "@/components/ui/simple-zoom-parallax";
import { HeroSection, Lightning } from "@/components/ui/hero-odyssey";

export default function SimpleZoomParallaxDemo() {

	React.useEffect(() => {
		const lenis = new Lenis()

		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)
	}, [])

	// Cosmic-themed images that match your project
	const images = [
		{
			src: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Red cosmic nebula',
		},
		{
			src: 'https://images.unsplash.com/photo-1614850523060-8da1d0b302f7?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Purple galaxy formation',
		},
		{
			src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Mars red planet surface',
		},
		{
			src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Starfield constellation',
		},
		{
			src: 'https://images.unsplash.com/photo-1502134249126-991b3ab5986?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Pink space aurora',
		},
		{
			src: 'https://images.unsplash.com/photo-1581822261290-991b3ab5986?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Cosmic explosion',
		},
		{
			src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Deep space galaxy',
		},
	];

	// Generate random stars for background
	const starsRef = useRef<HTMLDivElement>(null);
	const [stars, setStars] = React.useState<Array<{ id: number, x: number, y: number, size: number }>>([]);

	// Generate random stars for background
	React.useEffect(() => {
		const generatedStars = Array.from({ length: 150 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1
		}));
		setStars(generatedStars);
	}, []);

	// Animate stars
	useEffect(() => {
		if (!starsRef.current) return;

		const starElements = starsRef.current.querySelectorAll('.star');
		starElements.forEach((star) => {
			const animateStar = () => {
				const opacity = Math.random() * 0.8 + 0.2;
				star.animate(
					{ opacity: [opacity, opacity * 0.3, opacity] },
					{
						duration: Math.random() * 3000 + 2000,
						iterations: Infinity,
						easing: 'ease-in-out'
					}
				);
			};

			// Add a random delay to each star animation
			setTimeout(animateStar, Math.random() * 2000);
		});
	}, [stars]);

	// Feature Card Component with enhanced design
	const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
		return (
			<motion.div
				whileHover={{ y: -10, scale: 1.02 }}
				className="group relative bg-gradient-to-br from-gray-900/70 to-black/70 p-8 rounded-3xl border border-pink-500/30 backdrop-blur-lg hover:border-pink-500/60 transition-all duration-500 overflow-hidden h-full"
			>
				{/* Glow effect */}
				<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg"></div>

				<div className="relative z-10">
					<div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/20">
						<Icon className="w-8 h-8 text-white" />
					</div>
					<h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">{title}</h3>
					<p className="text-gray-300 leading-relaxed">{description}</p>
				</div>

				{/* Decorative elements */}
				<div className="absolute top-4 right-4 w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			</motion.div>
		);
	};

	// Stats Card Component with enhanced design
	const StatsCard = ({ value, label }: { value: string, label: string }) => {
		return (
			<motion.div
				whileHover={{ y: -5 }}
				className="relative bg-gradient-to-br from-gray-900/70 to-black/70 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-lg hover:border-purple-500/60 transition-all duration-500 overflow-hidden"
			>
				{/* Glow effect */}
				<div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 hover:opacity-20 transition-opacity duration-500 blur-lg"></div>

				<div className="relative z-10 text-center">
					<div className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-3">
						{value}
					</div>
					<div className="text-gray-300 text-lg">{label}</div>
				</div>
			</motion.div>
		);
	};

	return (
		<main className="min-h-screen w-full bg-black text-white relative">
			{/* Animated star background */}
			<div
				ref={starsRef}
				className='absolute inset-0 z-0 overflow-hidden'
			>
				{stars.map(star => (
					<div
						key={star.id}
						className='star absolute bg-white rounded-full'
						style={{
							left: `${star.x}%`,
							top: `${star.y}%`,
							width: `${star.size}px`,
							height: `${star.size}px`,
							opacity: Math.random() * 0.8 + 0.2
						}}
					/>
				))}
			</div>

			{/* Back Button */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className="fixed top-6 left-6 z-50"
			>
				<Link
					to="/"
					className="flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50 rounded-lg text-white transition-all duration-300 group"
				>
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
					Back to Home
				</Link>
			</motion.div>

			{/* Hero Section */}
			<div className="relative flex h-[50vh] items-center justify-center">
				{/* Cosmic radial spotlight */}
				<div className="hero-section">
					<HeroSection />
				</div>
			</div>

			{/* Features Section */}
			<section className="py-16 px-4 max-w-7xl mx-auto relative z-10">
				<motion.div
					initial={{ y: 40, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<div className="inline-block mb-6">
						<div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 px-6 py-2 rounded-full border border-pink-500/30 backdrop-blur-sm">
							<span className="text-pink-300 font-medium">Cosmic Experience</span>
						</div>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
						Parallax <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Features</span>
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto text-lg">
						Experience the power of layered scrolling with multiple zoom scales and cosmic imagery
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<FeatureCard
						icon={Layers}
						title="Multi-Layer Zoom"
						description="7 different zoom scales create depth and dimension as you scroll through space"
					/>
					<FeatureCard
						icon={Zap}
						title="Smooth Performance"
						description="Optimized animations using Framer Motion for buttery smooth 60fps scrolling"
					/>
					<FeatureCard
						icon={Eye}
						title="Visual Impact"
						description="Dynamic positioning and scaling creates an immersive cosmic exploration experience"
					/>
				</div>
			</section>

			{/* Zoom Parallax Component */}
			<ZoomParallax images={images} />

			{/* Technical Details Section */}
			<section className="py-16 px-4 max-w-7xl mx-auto relative z-10">
				<motion.div
					initial={{ y: 40, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
						How It <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Works</span>
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto text-lg">
						This parallax effect uses Framer Motion's useScroll and useTransform hooks to create smooth, scroll-driven animations
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<motion.div
						initial={{ x: -40, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						whileHover={{ y: -5 }}
						className="group relative bg-gradient-to-br from-red-900/20 to-pink-900/20 p-8 rounded-3xl border border-red-500/20 backdrop-blur-sm hover:border-red-500/40 transition-all duration-500 overflow-hidden"
					>
						{/* Glow effect */}
						<div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg"></div>
						<div className="relative z-10">
							<h3 className="text-2xl font-bold text-red-400 mb-4">Scroll Detection</h3>
							<p className="text-gray-300 mb-6 leading-relaxed">
								Uses useScroll hook to track scroll progress through a 300vh container with sticky positioning
							</p>
							<code className="text-sm bg-black/50 p-4 rounded-xl text-green-400 block font-mono border border-gray-700">
								useScroll(&#123; target: container, offset: ['start start', 'end end'] &#125;)
							</code>
						</div>
					</motion.div>

					<motion.div
						initial={{ x: 40, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						whileHover={{ y: -5 }}
						className="group relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-500 overflow-hidden"
					>
						{/* Glow effect */}
						<div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg"></div>
						<div className="relative z-10">
							<h3 className="text-2xl font-bold text-purple-400 mb-4">Scale Transform</h3>
							<p className="text-gray-300 mb-6 leading-relaxed">
								Maps scroll progress to different scale values (4x to 9x) for each image layer
							</p>
							<code className="text-sm bg-black/50 p-4 rounded-xl text-green-400 block font-mono border border-gray-700">
								useTransform(scrollYProgress, [0, 1], [1, 4])
							</code>
						</div>
					</motion.div>
				</div>

				{/* Stats Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
					<StatsCard value="7" label="Image Layers" />
					<StatsCard value="9x" label="Maximum Zoom" />
					<StatsCard value="60fps" label="Smooth Performance" />
				</div>
			</section>

			{/* Image Gallery Section */}
			<section className="py-16 px-4 max-w-7xl mx-auto relative z-10">
				<motion.div
					initial={{ y: 40, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
						Cosmic <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Gallery</span>
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto text-lg">
						Explore the same cosmic images used in the parallax effect
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{images.map((image, index) => (
						<motion.div
							key={index}
							initial={{ y: 40, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ y: -10 }}
							className="group cursor-pointer"
						>
							<div className="relative overflow-hidden rounded-2xl border border-pink-500/20 hover:border-pink-500/50 transition-all duration-500">
								{/* Glow effect */}
								<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg"></div>
								<div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 p-1 rounded-2xl">
									<img
										src={image.src}
										alt={image.alt}
										className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
									<div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<p className="font-medium">{image.alt}</p>
										<p className="text-sm text-gray-300">Zoom Scale: {[4, 5, 6, 5, 6, 8, 9][index]}x</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Final Section */}
			<div className="h-[50vh] flex items-center justify-center relative">
				{/* Background glow */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,100,0.05),transparent_70%)]" />
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1 }}
					viewport={{ once: true }}
					className="text-center relative z-10 max-w-3xl px-4"
				>
					<h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
						Journey <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Complete</span>
					</h2>
					<p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
						Experience the cosmos through interactive scrolling and smooth parallax animations
					</p>
					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to="/scroll-demo"
								className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
							>
								Try Advanced Scroll Demo
							</Link>
						</motion.div>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to="/"
								className="px-8 py-4 border border-gray-600 rounded-xl text-white hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm"
							>
								Explore More
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</main>
	);
}