import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthRedirectParams, RootStackParamList } from '../types';

export function useAuthRedirect(params?: AuthRedirectParams) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return () => {
    if (params?.redirectTo === 'Checkout') {
      navigation.replace('Checkout');
    } else if (params?.redirectTo === 'BookDetail' && params.book) {
      navigation.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'BookDetail', params: { book: params.book } }],
      });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };
}