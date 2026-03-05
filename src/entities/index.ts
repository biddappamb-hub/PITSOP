/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: drivers
 * Interface for Drivers
 */
export interface Drivers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  driverName?: string;
  /** @wixFieldType text */
  teamName?: string;
  /** @wixFieldType number */
  carNumber?: number;
  /** @wixFieldType text */
  nationality?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  driverImage?: string;
}


/**
 * Collection ID: driverstandings
 * Interface for DriverStandings
 */
export interface DriverStandings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  rank?: number;
  /** @wixFieldType text */
  driverName?: string;
  /** @wixFieldType number */
  points?: number;
  /** @wixFieldType text */
  teamName?: string;
  /** @wixFieldType number */
  wins?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  driverImage?: string;
}


/**
 * Collection ID: racecalendar
 * Interface for RaceCalendar
 */
export interface RaceCalendar {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  grandPrixName?: string;
  /** @wixFieldType text */
  circuitName?: string;
  /** @wixFieldType date */
  raceDate?: Date | string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType number */
  roundNumber?: number;
  /** @wixFieldType url */
  officialURL?: string;
}


/**
 * Collection ID: teams
 * Interface for Formula1Teams
 */
export interface Formula1Teams {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  teamName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  teamLogo?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  baseLocation?: string;
  /** @wixFieldType text */
  teamPrincipal?: string;
  /** @wixFieldType number */
  championshipsWon?: number;
  /** @wixFieldType url */
  websiteUrl?: string;
}
