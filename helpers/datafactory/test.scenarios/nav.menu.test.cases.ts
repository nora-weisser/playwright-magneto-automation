import { faker } from '@faker-js/faker';

export interface NAV_ITEMS {
    categories: string[],
    url: string,
    title: string
}

export const navigationRoutes: NAV_ITEMS[] = [
    // Women category
    {
      categories: [" Women", "Tops", "Jackets"],
      url: '/women/tops-women/jackets-women.html',
      title: 'Jackets - Tops - Women'
    },
    {
      categories: [" Women", "Tops", "Hoodies & Sweatshirts"],
      url: '/women/tops-women/hoodies-and-sweatshirts-women.html',
      title: 'Hoodies & Sweatshirts - Tops - Women'
    },
    {
      categories: [" Women", "Tops", "Tees"],
      url: '/women/tops-women/tees-women.html',
      title: 'Tees - Tops - Women'
    },
    {
      categories: [" Women", "Tops", "Bras & Tanks"],
      url: '/women/tops-women/tanks-women.html',
      title: 'Bras & Tanks - Tops - Women'
    },
    {
      categories: [" Women", "Bottoms", "Pants"],
      url: '/women/bottoms-women/pants-women.html',
      title: 'Pants - Bottoms - Women'
    },
    {
      categories: [" Women", "Bottoms", "Shorts"],
      url: '/women/bottoms-women/shorts-women.html',
      title: 'Shorts - Bottoms - Women'
    },
  
    // Men category
    {
      categories: [" Men", "Tops", "Jackets"],
      url: '/men/tops-men/jackets-men.html',
      title: 'Jackets - Tops - Men'
    },
    {
      categories: [" Men", "Tops", "Hoodies & Sweatshirts"],
      url: '/men/tops-men/hoodies-and-sweatshirts-men.html',
      title: 'Hoodies & Sweatshirts - Tops - Men'
    },
    {
      categories: [" Men", "Tops", "Tees"],
      url: '/men/tops-men/tees-men.html',
      title: 'Tees - Tops - Men'
    },
    {
      categories: [" Men", "Tops", "Tanks"],
      url: '/men/tops-men/tanks-men.html',
      title: 'Tanks - Tops - Men'
    },
    {
      categories: [" Men", "Bottoms", "Pants"],
      url: '/men/bottoms-men/pants-men.html',
      title: 'Pants - Bottoms - Men'
    },
    {
      categories: [" Men", "Bottoms", "Shorts"],
      url: '/men/bottoms-men/shorts-men.html',
      title: 'Shorts - Bottoms - Men'
    },
  
    // Gear category
    {
      categories: [" Gear", "Bags"],
      url: '/gear/bags.html',
      title: 'Bags - Gear'
    },
    {
      categories: [" Gear", "Fitness Equipment"],
      url: '/gear/fitness-equipment.html',
      title: 'Fitness Equipment - Gear'
    },
    {
      categories: [" Gear", "Watches"],
      url: '/gear/watches.html',
      title: 'Watches - Gear'
    },
  ];

/**
 * Returns a random navigation route (array of categories) from the list of possible routes.
 * @param routes Array of navigation items.
 * @returns A random array of categories (string[]).
 */
export function getRandomNavigationRoute(): string[] {
    const listOfCategoryLists = navigationRoutes.map(item => item.categories);
    return faker.helpers.arrayElement(listOfCategoryLists);
}
