import { faker } from '@faker-js/faker';

export interface FILTERS {
    size?: string
    color?: string
    price?: {
      min?: number
      max?: number
    }
    ecoCollection?: boolean
    activity?: string
  }

/**
 * Represents a clothes's configuration details.
 */
export type ClothesDetails = {
    category: string[];
    filters: FILTERS;
    productPreferences: {
        size: string;
        color: string;
        quantity: number;
    };
};

// Size and color options
const topSizes = ['XS', 'S', 'M', 'L', 'XL'];
const bottomSizes = ['32', '33', '34', '36'];
const colors = ['Blue', 'Green', 'Red', 'Black', 'White', 'Purple', 'Orange', 'Gray'];

// Category paths
const topCategories = [
    [' Men', 'Tops', 'Jackets'],
    [' Men', 'Tops', 'Hoodies & Sweatshirts'],
    [' Men', 'Tops', 'Tees'],
    [' Women', 'Tops', 'Jackets'],
    [' Women', 'Tops', 'Tees'],
    [' Women', 'Tops', 'Hoodies & Sweatshirts'],
];

const bottomCategories = [
    [' Men', 'Bottoms', 'Pants'],
    [' Men', 'Bottoms', 'Shorts'],
    [' Women', 'Bottoms', 'Pants'],
    [' Women', 'Bottoms', 'Shorts'],
];

const gearCategories = [
    [' Gear', 'Bags'],
    [' Gear', 'Fitness Equipment'],
    [' Gear', 'Watches'],
];

/**
 * Generates a random top clothing product configuration.
 */
export function generateRandomClothingTopProduct(): ClothesDetails {
    const category = faker.helpers.arrayElement(topCategories);
    const size = faker.helpers.arrayElement(topSizes);
    const color = faker.helpers.arrayElement(colors);
    const quantity = faker.number.int({ min: 1, max: 3 });

    return {
        category,
        filters: { size, color },
        productPreferences: { size, color, quantity },
    };
}

/**
 * Generates a random bottom clothing product configuration.
 */
export function generateRandomClothingBottomProduct(): ClothesDetails {
    const category = faker.helpers.arrayElement(bottomCategories);
    const size = faker.helpers.arrayElement(bottomSizes);
    const color = faker.helpers.arrayElement(colors);
    const quantity = faker.number.int({ min: 1, max: 3 });

    return {
        category,
        filters: { size, color },
        productPreferences: { size, color, quantity },
    };
}

/**
 * Represents a clothes's configuration details.
 */
export interface GearDetails {
    category: string[];
    filters: FILTERS;
    productPreferences: {
      quantity: number;
    };
  }

const gearActivityMap: Record<string, string[]> = {
    'Bags': ['Yoga', 'Gym', 'Hiking', 'Overnight', 'School', 'Trail', 'Travel', 'Urban'],
    'Fitness Equipment': ['Yoga', 'Recreation', 'Gym', 'Athletic', 'Sports'],
    'Watches': ['Outdoor', 'Recreation', 'Gym', 'Athletic', 'Sports'],
  };

/**
 * Generates a random bottom clothing product configuration.
 */
export function generateRandomGearProduct(isActivity = true): GearDetails {
    const category = faker.helpers.arrayElement(gearCategories);
    const subCategory = category[1]; // e.g. "Bags", "Watches", etc.
    const quantity = faker.number.int({ min: 1, max: 3 });
  
    let activity: string | undefined;
  
    if (isActivity && gearActivityMap[subCategory]) {
      activity = faker.helpers.arrayElement(gearActivityMap[subCategory]);
    }
  
    return {
      category,
      filters: { ...(activity && { activity }) },
      productPreferences: { quantity },
    };
  }