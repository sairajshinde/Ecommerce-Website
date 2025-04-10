import { Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { ProductsComponent } from './component/products/products.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ProfileComponent } from './component/profile/profile.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PurchaseComponent } from './component/purchase/purchase.component';
import { authguardGuard } from './service/authguard.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/products",  
        pathMatch: "full"
    },
    {
        path: "header",
        component: HeaderComponent,
        canActivate: [authguardGuard]  
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [authguardGuard]
    },
    {
        path: "products",
        component: ProductsComponent,
        canActivate: [authguardGuard]
    },
    {
        path: "cart",
        component: CartComponent,
        canActivate: [authguardGuard]
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "logout",
        component: LogoutComponent,
        canActivate: [authguardGuard]
    },
    {
        path: "purchase",
        component: PurchaseComponent,
        canActivate: [authguardGuard]
    }
];
