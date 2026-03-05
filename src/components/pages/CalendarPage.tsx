import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { RaceCalendar } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function CalendarPage() {
  const [races, setRaces] = useState<RaceCalendar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRaces();
  }, []);

  const loadRaces = async () => {
    try {
      const result = await BaseCrudService.getAll<RaceCalendar>('racecalendar');
      // Sort by round number
      const sortedRaces = result.items.sort((a, b) => (a.roundNumber || 0) - (b.roundNumber || 0));
      setRaces(sortedRaces);
    } catch (error) {
      console.error('Error loading races:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'TBA';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMM dd, yyyy');
    } catch {
      return 'TBA';
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
            RACE <span className="text-accent-red">CALENDAR</span>
          </h1>
          <p className="font-paragraph text-lg text-light-grey max-w-3xl leading-relaxed">
            Follow the complete Formula 1 season schedule. From iconic circuits to new venues, experience every race weekend.
          </p>
        </motion.div>
      </section>

      {/* Calendar Table */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 pb-24">
        <div className="min-h-[600px]">
          {isLoading ? null : races.length > 0 ? (
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
                        Round
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Grand Prix
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Circuit
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="font-heading text-sm font-bold text-accent-red text-left px-6 py-4 uppercase tracking-wider">
                        Info
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {races.map((race, index) => (
                      <motion.tr
                        key={race._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="border-b border-light-grey border-opacity-10 hover:bg-dark-charcoal transition-colors duration-300"
                      >
                        <td className="px-6 py-4">
                          <div className="font-heading text-2xl font-black text-accent-red">
                            {race.roundNumber || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-heading text-lg font-bold text-white">
                            {race.grandPrixName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-paragraph text-sm text-light-grey">
                            {race.circuitName || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-paragraph text-sm text-light-grey flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent-red" />
                            {race.location || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-paragraph text-sm text-light-grey flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent-red" />
                            {formatDate(race.raceDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {race.officialURL && (
                            <a
                              href={race.officialURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-red hover:text-white transition-colors duration-300"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden">
                {races.map((race, index) => (
                  <motion.div
                    key={race._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-light-grey border-opacity-10 p-6 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-heading text-3xl font-black text-accent-red mb-2">
                          Round {race.roundNumber || '-'}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white mb-2">
                          {race.grandPrixName}
                        </h3>
                      </div>
                      {race.officialURL && (
                        <a
                          href={race.officialURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-red hover:text-white transition-colors duration-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {race.circuitName && (
                        <p className="font-paragraph text-sm text-light-grey">
                          <span className="text-accent-red font-semibold">Circuit:</span> {race.circuitName}
                        </p>
                      )}
                      {race.location && (
                        <p className="font-paragraph text-sm text-light-grey flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent-red" />
                          {race.location}
                        </p>
                      )}
                      <p className="font-paragraph text-sm text-light-grey flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent-red" />
                        {formatDate(race.raceDate)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-light-grey">No races scheduled.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
