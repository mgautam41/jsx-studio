import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-30 border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-center md:justify-start md:pl-20">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
          >
            <span className="text-primary-foreground font-bold text-lg">R</span>
          </motion.div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            React Runner
          </h1>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
