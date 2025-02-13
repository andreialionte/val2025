import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WritingComponent } from './pages/writing/writing.component';

export const appRoutes: Route[] = [
    {path: "", component: HomeComponent},
    {path:"writing", component: WritingComponent}
];
