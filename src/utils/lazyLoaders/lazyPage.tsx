import React, {Suspense} from 'react';
import {View, ActivityIndicator} from 'react-native';

export const withPageSuspense = (
  Component: React.LazyExoticComponent<(props: any) => JSX.Element>,
  PageFallBackUi: () => JSX.Element,
) => {
  return (props: any) => {
    return (
      <Suspense fallback={<PageFallBackUi />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export const PageFallBackUi = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={'large'} color={'blue'} />
    </View>
  );
};
