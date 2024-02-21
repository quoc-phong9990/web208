import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let login = localStorage.getItem('login');
  if (login=='ok'){    
    return true;
  }
  else {
    router.navigate(['login']);
    return false;
  }
};
