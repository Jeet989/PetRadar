import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
        // @ts-ignore
        navigationRef.navigate(name, params);
    }
}

export function reset(routeName: string, params: any, routeNames: string[]) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: routeName, params}
                ],
                routeNames: routeNames
            })
        )
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}