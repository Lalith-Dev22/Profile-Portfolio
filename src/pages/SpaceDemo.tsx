import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { motion } from "framer-motion";

const SpaceDemo = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        bgImageSrc="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80"
        title="Cosmic Journey"
        date="2023"
        scrollToExpand="Scroll to explore the universe"
        textBlend={false}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Explore the Infinite Cosmos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Embark on a breathtaking journey through the vastness of space. 
            Witness the birth of stars, the dance of galaxies, and the mysteries 
            of the universe unfold before your eyes in stunning 4K resolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-300">Stellar Nurseries</h3>
            <p className="text-gray-300 mb-6">
              Observe the magnificent process of star formation in these cosmic cradles 
              where gravity compresses gas and dust to ignite the birth of new suns.
            </p>
            <div className="aspect-video rounded-xl overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80" 
                alt="Stellar Nursery" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Galactic Collisions</h3>
            <p className="text-gray-300 mb-6">
              Experience the dramatic dance of galaxies as they spiral toward each other, 
              creating spectacular displays of cosmic fireworks and gravitational waves.
            </p>
            <div className="aspect-video rounded-xl overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1614850523060-8da1d0b302f7?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80" 
                alt="Galactic Collision" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold mb-6">The Final Frontier Awaits</h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Join us on this extraordinary voyage through space and time. 
            Each frame captured in pristine 4K resolution reveals the universe's 
            hidden beauty and profound mysteries.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-bold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105">
            Begin Your Journey
          </button>
        </motion.div>
      </ScrollExpandMedia>
    </div>
  );
};

export default SpaceDemo;