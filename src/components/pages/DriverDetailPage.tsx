import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Drivers } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, User, Flag, Hash, Building2 } from 'lucide-react';

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [driver, setDriver] = useState<Drivers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDriver();
  }, [id]);

  const loadDriver = async () => {
    if (!id) return;
    
    try {
      const data = await BaseCrudService.getById<Drivers>('drivers', id);
      setDriver(data);
    } catch (error) {
      console.error('Error loading driver:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-charcoal text-foreground">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : !driver ? (
          <div className="text-center py-24">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Driver Not Found</h2>
            <p className="font-paragraph text-lg text-light-grey mb-8">
              The driver you're looking for doesn't exist.
            </p>
            <Link to="/drivers">
              <button className="bg-accent-red text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded hover:bg-opacity-90 transition-all duration-300">
                Back to Drivers
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Back Button */}
            <Link to="/drivers">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 text-light-grey hover:text-accent-red font-paragraph font-medium mb-8 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Drivers
              </motion.button>
            </Link>

            {/* Driver Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-[600px] rounded overflow-hidden bg-medium-grey">
                  {driver.driverImage && (
                    <Image
                      src={driver.driverImage}
                      alt={driver.driverName || 'F1 Driver'}
                      className="w-full h-full object-cover"
                      width={800}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal via-transparent to-transparent" />
                  
                  {/* Car Number Badge */}
                  {driver.carNumber && (
                    <div className="absolute top-8 right-8 bg-accent-red text-white font-heading text-5xl font-black w-24 h-24 rounded flex items-center justify-center shadow-lg">
                      {driver.carNumber}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <h1 className="font-heading text-5xl md:text-6xl font-black text-white mb-8">
                  {driver.driverName}
                </h1>

                <div className="space-y-6">
                  {driver.teamName && (
                    <div className="flex items-start gap-4 bg-medium-grey p-6 rounded border border-light-grey border-opacity-10">
                      <div className="bg-accent-red bg-opacity-10 p-3 rounded">
                        <Building2 className="w-6 h-6 text-accent-red" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-light-grey mb-1">Team</p>
                        <p className="font-heading text-xl font-bold text-white">{driver.teamName}</p>
                      </div>
                    </div>
                  )}

                  {driver.carNumber && (
                    <div className="flex items-start gap-4 bg-medium-grey p-6 rounded border border-light-grey border-opacity-10">
                      <div className="bg-accent-red bg-opacity-10 p-3 rounded">
                        <Hash className="w-6 h-6 text-accent-red" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-light-grey mb-1">Car Number</p>
                        <p className="font-heading text-xl font-bold text-white">{driver.carNumber}</p>
                      </div>
                    </div>
                  )}

                  {driver.nationality && (
                    <div className="flex items-start gap-4 bg-medium-grey p-6 rounded border border-light-grey border-opacity-10">
                      <div className="bg-accent-red bg-opacity-10 p-3 rounded">
                        <Flag className="w-6 h-6 text-accent-red" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-light-grey mb-1">Nationality</p>
                        <p className="font-heading text-xl font-bold text-white">{driver.nationality}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <Link to="/drivers">
                    <button className="bg-accent-red text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded hover:bg-opacity-90 transition-all duration-300 w-full md:w-auto">
                      View All Drivers
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
