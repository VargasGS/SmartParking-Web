import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { VehiculoCampoService } from 'src/app/services/vehiculo-campo/vehiculo-campo.service';
import { IngresoDia, VehiculoCampoRequest } from '@app/models/vehiculo-campo/vehiculo-campo';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit, OnDestroy {

  VehiculoCampoList: VehiculoCampoRequest[] = [];

  ingresosActualesColones: number = 0;
  ingresosActualesDolares: number = 0;

  totalVehiculos: number = 0;
  ingresosActuales: number = 0;

  chart: any;

  constructor(
    private vehiculoCampoServicio: VehiculoCampoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  cargarDashboard() {
    this.obtenerVehiculoCampo();
    this.ObtenerIngresosDia();
  }

  obtenerVehiculoCampo() {
    this.vehiculoCampoServicio.obtenerVehiculoCampo().subscribe({
      next: (res) => {
        this.VehiculoCampoList = res ?? [];

        // KPIs
        this.totalVehiculos = this.VehiculoCampoList.length;

        this.ingresosActuales = this.VehiculoCampoList.reduce((acc, v) => {
          return acc + (v.montoPrecioColones || 0);
        }, 0);

        this.crearGrafico(this.VehiculoCampoList);

        this.cdr.detectChanges();
      }
    });
  }

  ObtenerIngresosDia() {
    this.vehiculoCampoServicio.ObtenerIngresosDia().subscribe({
      next: (res) => {

        if (res && res.length > 0) {
          this.ingresosActualesColones = Number(res[0].ingresosColones);
          this.ingresosActualesDolares = Number(res[0].ingresosDolares);

          this.cdr.detectChanges(); 
        }
      }
    });
  }

  crearGrafico(res: VehiculoCampoRequest[]) {

    const conteo: any = {};

    res.forEach(v => {
      const tipo = v.descripcionTipoVehiculo;
      conteo[tipo] = (conteo[tipo] || 0) + 1;
    });

    const labels = Object.keys(conteo);
    const data = Object.values(conteo);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('miGrafico', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Vehículos por tipo',
          data: data,
          borderRadius: 8,
          backgroundColor: '#4E8D9C',
          borderColor: '#4E8D9C',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  refrescar() {
    this.cargarDashboard();
  }
}