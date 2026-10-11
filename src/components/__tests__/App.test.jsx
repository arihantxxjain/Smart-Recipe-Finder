import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test/utils';
import Navbar from '../Navbar';
import RecipeCard from '../RecipeCard';

describe('Smart Recipe Finder Components', () => {
  it('renders Navbar brand name and author attribution', () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByText('SmartRecipe')).toBeInTheDocument();
    expect(screen.getByText('Finder')).toBeInTheDocument();
    expect(screen.getByText('By Arihant Jain')).toBeInTheDocument();
  });

  it('renders RecipeCard with title and styling', () => {
    const mockMeal = {
      idMeal: '12345',
      strMeal: 'Spicy Garlic Noodles',
      strMealThumb: 'https://example.com/noodles.jpg',
      strCategory: 'Pasta',
      strArea: 'Asian',
    };

    renderWithRouter(<RecipeCard meal={mockMeal} />);

    expect(screen.getByText('Spicy Garlic Noodles')).toBeInTheDocument();
    expect(screen.getByText('Asian Style')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });
});
