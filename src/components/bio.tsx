/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';
import React, { ComponentProps, forwardRef, Ref } from 'react';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';
import {
  faTwitter,
  faLinkedin,
  faGithub,
  faXing,
  faDev,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const Content = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1.5)};
`;

const GatsbyImage = forwardRef(
  (props: ComponentProps<typeof Image>, ref: Ref<Image>) => (
    <Image {...props} ref={ref} />
  )
);

const Avatar = styled(GatsbyImage)`
  border-radius: 100%;
  margin-bottom: 0;
  margin-right: ${rhythm(1 / 2)};
  min-width: 50px;
  border: 2px solid var(--color-primary);
`;

const Social = styled.a`
  margin: 0 ${rhythm(1 / 4)};
  text-decoration: none !important;
`;

const Bio = () => {
  const { avatar, site } = useStaticQuery<PureBioProps>(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
          }
          social {
            twitter
            linkedin
            xing
            github
            dev
          }
        }
      }
    }
  `);

  return <PureBio avatar={avatar} site={site} />;
};

export interface PureBioProps {
  avatar: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
  site: {
    siteMetadata: {
      author: {
        name: string;
      };
      social: {
        twitter: string;
        linkedin: string;
        xing: string;
        github: string;
      };
    };
  };
}

export const PureBio: React.FC<PureBioProps> = ({ avatar, site }) => {
  // const avatar = avatar;
  const author = site.siteMetadata.author;
  const social = site.siteMetadata.social;

  return (
    <Content>
      <Avatar
        fixed={avatar.childImageSharp.fixed}
        alt={author.name}
        imgStyle={{ borderRadius: '50%' }}
      />
      <p>
        My name is <strong>{author.name}</strong>. I live and work in Vienna as
        a frontend developer with an ongoing study in Business Informatics. On
        this blog, I will mostly write about frontend development in combination
        with serverless services by Amazon Web Services (AWS).
        {` `}
        <br />{' '}
        <Social
          href={`https://linkedin.com/${social.linkedin}`}
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </Social>
        <Social href={`https://xing.com/${social.xing}`} target="_blank">
          <FontAwesomeIcon icon={faXing} />
        </Social>
        <Social href={`https://twitter.com/${social.twitter}`} target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </Social>
        <Social href={`https://github.com/${social.github}`} target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </Social>
        <Social href={`https://dev.to/${social.dev}`} target="_blank">
          <FontAwesomeIcon icon={faDev} />
        </Social>
      </p>
    </Content>
  );
};

export default Bio;
