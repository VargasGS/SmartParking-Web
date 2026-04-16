import { Component } from '@angular/core';
import { VehiculoCampoService } from 'src/app/services/vehiculo-campo/vehiculo-campo.service';
import { IngresoDia, VehiculoCampo, VehiculoCampoRequest } from '@app/models/vehiculo-campo/vehiculo-campo';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js/auto';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  imports: [

    MatCardModule

  ],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {

  VehiculoCampoList: VehiculoCampoRequest[] = [];
  IngresosDiasList: IngresoDia[] = [];

  totalVehiculos: number = 0;
  ingresosActuales: number = 0;

  ingresosActualesColones: number = 0;
  ingresosActualesDolares: number = 0;


  chart: any;
  graficoInicializado: boolean = false;


  constructor(
    private vehiculoCampoServicio: VehiculoCampoService,
    private cdr: ChangeDetectorRef

  ) {

  }

  ngOnInit(): void {
    this.obtenerVehiculoCampo();
    this.ObtenerIngresosDia();
  }

  crearGrafico(res: any[]) {

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
          backgroundColor: '#281C59',
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

  obtenerVehiculoCampo() {
    this.vehiculoCampoServicio.obtenerVehiculoCampo().subscribe({
      next: (res) => {

        this.VehiculoCampoList = res ?? [];

        // KPIs
        this.totalVehiculos = this.VehiculoCampoList.length;

        this.ingresosActuales = this.VehiculoCampoList.reduce((acc, v) => {
          return acc + (v.montoPrecioColones || 0);
        }, 0);

        setTimeout(() => {
          this.crearGrafico(this.VehiculoCampoList);
        });

        console.log(this.VehiculoCampoList);
      }
    });
  }

  ObtenerIngresosDia() {
    this.vehiculoCampoServicio.ObtenerIngresosDia().subscribe({
      next: (res) => {
        console.log(res[0].ingresosColones, res[0].ingresosDolares);
        
        this.ingresosActualesColones = res[0].ingresosColones;
        this.ingresosActualesDolares = res[0].ingresosDolares;
        console.log(this.ingresosActualesColones, this.ingresosActualesDolares);
      }
    });
  }
}