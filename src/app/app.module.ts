import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponent } from './pages/charts/pie-chart/pie-chart.component';
import { SingleCountryComponent } from './pages/single-country/single-country.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, SingleCountryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PieChartComponent, LineChartComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
