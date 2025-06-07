import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';
import formatNumber from '../utils/formatNumber';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',

          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        },

        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,

              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },

            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },

          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,

              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },

            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const re = (pattern) => new RegExp(`${pattern}`);

      for (let i = 0; i < repositoryItems.length; i += 1) {
        const repositoryItem = repositoryItems[i];
        const repository = repositories.edges[i].node;

        [
          repository.fullName,
          repository.description,
          repository.language,
          formatNumber(repository.forksCount),
          formatNumber(repository.stargazersCount),
          formatNumber(repository.ratingAverage),
          formatNumber(repository.reviewCount),
        ].forEach((value) =>
          expect(repositoryItem).toHaveTextContent(re(value))
        );
      }
    });
  });
});
