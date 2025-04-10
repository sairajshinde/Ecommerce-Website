import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token = localStorage.getItem('tokenValue');
  if (token) {
    return true;
  } else {
    alert('Please Login');
    router.navigateByUrl('/login');
    return false;
  }
};
