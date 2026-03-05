import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { DriverStandings } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trophy, TrendingUp } from 'lucide-react';

export default function StandingsPage() {
  const [standings, setStandings] = useState<DriverStandings[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      const result = await BaseCrudService.getAll<DriverStandings>('driverstandings');
      // Sort by rank
      const sortedStandings = result.items.sort((a, b) => (a.rank || 0) - (b.rank || 0));
      setStandings(sortedStandings);
    } catch (error) {
      console.error('Error loading standings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankColor = (rank: number | undefined) => {
    if (!rank) return 'text-light-grey';
    if (rank === 1) return 'text-accent-red';
    if (rank <= 3) return 'text-light-grey';
    return 'text-light-grey';
  };

  const getRankBg = (rank: number | undefined) => {
    if (!rank) return 'bg-medium-grey';
    if (rank === 1) return 'bg-accent-red';
    if (rank === 2) return 'bg-light-grey bg-opacity-20';
    if (rank === 3) return 'bg-light-grey bg-opacity-10';
    return 'bg-medium-grey';
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
            DRIVER <span className="text-accent-red">STANDINGS</span>
          </h1>
          <p className="font-paragraph text-lg text-light-grey max-w-3xl leading-relaxed">
            Track the championship battle as it unfolds. See who's leading the race to become World Champion.
          </p>
        </motion.div>
      </section>

      {/* Standings Table */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 pb-24">
        <div className="min-h-[600px]">
          {isLoading ? null : standings.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-medium-grey border border-light-grey border-opacity-10 rounded overflow-hidden"
            >
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-charcoal border-b border-light-grey border-opacity-10">
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-center px-6 py-4 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-center px-6 py-4 uppercase tracking-wider">
                        Wins
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((driver, index) => (
                      <motion.tr
                        key={driver._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={`border-b border-light-grey border-opacity-10 hover:bg-dark-charcoal transition-colors duration-300 ${
                          driver.rank === 1 ? 'bg-accent-red bg-opacity-5' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className={`font-heading text-3xl font-black ${getRankColor(driver.rank)}`}>
                            {driver.rank}
                            {driver.rank === 1 && <Trophy className="inline-block w-6 h-6 ml-2 text-accent-red" />}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            {driver.driverImage && (
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-charcoal">
                                <Image
                                  src={driver.driverImage}
                                  alt={driver.driverName || 'Driver'}
                                  className="w-full h-full object-cover"
                                  width={48}
                                />
                              </div>
                            )}
                            <div className="font-heading text-lg font-bold text-white">
                              {driver.driverName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-paragraph text-sm text-light-grey">
                            {driver.teamName || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="font-heading text-2xl font-black text-accent-red">
                            {driver.points || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="font-paragraph text-lg font-semibold text-light-grey">
                            {driver.wins || 0}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden">
                {standings.map((driver, index) => (
                  <motion.div
                    key={driver._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`border-b border-light-grey border-opacity-10 p-6 last:border-b-0 ${
                      driver.rank === 1 ? 'bg-accent-red bg-opacity-5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`${getRankBg(driver.rank)} w-16 h-16 rounded flex items-center justify-center flex-shrink-0`}>
                        <span className={`font-heading text-2xl font-black ${driver.rank === 1 ? 'text-white' : 'text-white'}`}>
                          {driver.rank}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {driver.driverImage && (
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-charcoal">
                              <Image
                                src={driver.driverImage}
                                alt={driver.driverName || 'Driver'}
                                className="w-full h-full object-cover"
                                width={48}
                              />
                            </div>
                          )}
                          <h3 className="font-heading text-xl font-bold text-white">
                            {driver.driverName}
                            {driver.rank === 1 && <Trophy className="inline-block w-5 h-5 ml-2 text-accent-red" />}
                          </h3>
                        </div>
                        
                        {driver.teamName && (
                          <p className="font-paragraph text-sm text-light-grey mb-3">
                            {driver.teamName}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="font-paragraph text-xs text-light-grey mb-1">Points</p>
                            <p className="font-heading text-2xl font-black text-accent-red">
                              {driver.points || 0}
                            </p>
                          </div>
                          <div>
                            <p className="font-paragraph text-xs text-light-grey mb-1">Wins</p>
                            <p className="font-heading text-xl font-bold text-white">
                              {driver.wins || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-light-grey">No standings available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Championship Info */}
      {standings.length > 0 && (
        <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-accent-red to-accent-red bg-opacity-90 rounded-lg p-8 md:p-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                Championship Battle
              </h2>
            </div>
            <p className="font-paragraph text-base text-white text-opacity-90 max-w-2xl mx-auto">
              The race for the World Championship is heating up. Every point counts as drivers push their limits on the track.
            </p>
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  );
}
