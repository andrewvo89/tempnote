import { Fragment } from 'react';
import {
  HStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from '@chakra-ui/react';

/**
 * Skeleton loading component.
 * @return {*}  {JSX.Element}
 */
const NoteSkeleton = (): JSX.Element => {
  return (
    <Fragment>
      <Skeleton height='43px' width='75%' />
      <HStack>
        <SkeletonCircle size='20' />
        <SkeletonText noOfLines={5} flex={1} />
      </HStack>
      <Skeleton height='12px' />
      <SkeletonText noOfLines={5} />
      <SkeletonText noOfLines={3} width='50%' />
      <Skeleton height='24px' />
      <SkeletonText noOfLines={5} />
      <Skeleton height='6px' />
      <HStack>
        <SkeletonText noOfLines={5} flex={1} />
        <Skeleton w='75px' h='75px' />
      </HStack>
      <SkeletonText noOfLines={3} />
      <Skeleton height='16px' />
      <HStack>
        <SkeletonText noOfLines={4} flex={1} />
        <SkeletonCircle size='12' />
        <SkeletonText noOfLines={4} flex={1} />
        <SkeletonCircle size='12' />
      </HStack>
      <SkeletonText noOfLines={10} />
    </Fragment>
  );
};

export default NoteSkeleton;
