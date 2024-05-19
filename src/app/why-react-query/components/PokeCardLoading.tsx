import React from 'react';
import Skeleton from 'react-loading-skeleton';
import '../styles/index.css';

const PokeCardLoading = () => (
  <article className="card">
    <figure>
      <Skeleton
        baseColor="gray"
        circle
        enableAnimation
        width={200}
        height={200}
      />
      <figcaption>
        <Skeleton baseColor="gray" enableAnimation height={21} width={109} />
        <Skeleton baseColor="gray" enableAnimation height={21} width={109} />
      </figcaption>
    </figure>
  </article>
);

export default PokeCardLoading;
