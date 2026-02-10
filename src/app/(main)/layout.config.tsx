import { Linkedin, Mail, PhoneCall } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '@/public/images/favicon.ico';
import Image from 'next/image';

/**
 * This file contains the configuration for the base layout of the application.
 * It includes links to social media, documentation, and other resources.
 * The configuration is used by the BaseLayout component.
 * https://fumadocs.dev/docs/ui/navigation/links
 */

export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/GreenH47',
  links: [
    {
      type: 'icon',
      label: 'Linkedin', // `aria-label`
      icon: <Linkedin />,
      text: 'Linkedin',
      url: 'http://linkedin.com/in/jihyeonjeong',
    },

    {
      type: 'icon',
      label: 'Email', // `aria-label`
      icon: <Mail />,
      text: 'Mail',
      url: 'mailto:jihyeonjeong1117@gmail.com',
    },

    {
      type: 'icon',
      label: 'PhoneCall', // `aria-label`
      icon: <PhoneCall />,
      text: 'PhoneCall',
      url: 'tel:+1093298766',
    },
  ],
};

export const logo = (
  <>
    <Image
      alt="Fumadocs"
      src={Logo}
      sizes="100px"
      className="hidden w-20 md:w-24 in-[.uwu]:block"
      aria-label="Fumadocs"
    />
  </>
);
