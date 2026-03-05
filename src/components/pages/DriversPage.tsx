import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Drivers } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Drivers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDrivers();
  }, []);

  ;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-charcoal text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">
            F1 <span className="text-accent-red">DRIVERS</span>
          </h1>
          <p className="font-paragraph text-lg text-light-grey max-w-3xl leading-relaxed">
            Meet the elite athletes who push the limits of speed and precision on the world's most challenging circuits.
          </p>
        </motion.div>
      </section>

      {/* Drivers Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 pb-24">
        <div className="min-h-[600px]">
          {isLoading ? null : drivers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {drivers.map((driver, index) => (
                <motion.div
                  key={driver._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/drivers/${driver._id}`}>
                    <div className="bg-medium-grey border border-light-grey border-opacity-10 rounded overflow-hidden hover:border-accent-red hover:border-opacity-50 transition-all duration-300 group cursor-pointer h-full">
                      {/* Driver Image */}
                      <div className="relative h-80 overflow-hidden bg-dark-charcoal">
                        {driver.driverImage && (
                          <Image
                            src={driver.driverImage}
                            alt={driver.driverName || 'F1 Driver'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-medium-grey via-transparent to-transparent" />

                        {/* Car Number Badge */}
                        {driver.carNumber && (
                          <div className="absolute top-4 right-4 bg-accent-red text-white font-heading text-3xl font-black w-16 h-16 rounded flex items-center justify-center">
                            {driver.carNumber}
                          </div>
                        )}
                      </div>

                      {/* Driver Info */}
                      <div className="p-6">
                        <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-accent-red transition-colors duration-300">
                          {driver.driverName}
                        </h3>

                        <div className="space-y-2 mb-4">
                          {driver.teamName && (
                            <p className="font-paragraph text-sm text-light-grey">
                              <span className="text-accent-red font-semibold">Team:</span> {driver.teamName}
                            </p>
                          )}
                          {driver.nationality && (
                            <p className="font-paragraph text-sm text-light-grey">
                              <span className="text-accent-red font-semibold">Nationality:</span> {driver.nationality}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center text-accent-red font-paragraph font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                          View Profile
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-light-grey">No drivers found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
