const app = Vue.createApp({
  data() {
      return {
          step: 1,
          unit: '',
          techName: '',
          date: '',
          cost: 0,
          arrivalTime: '',
          departureTime: '',
          supervisor: '',
          taskDetails: '',
          pendingIssues: '',
          report: '',
          loading: false,
          showCopyAlert: false // Adiciona a variável para controlar a exibição do alerta
      };
  },
  computed: {
      timeDifference() {
          if (this.arrivalTime && this.departureTime) {
              const arrival = new Date(`1970-01-01T${this.arrivalTime}:00`);
              const departure = new Date(`1970-01-01T${this.departureTime}:00`);
              return (departure - arrival) / 60000; // in minutes
          }
          return 0;
      }
  },
  methods: {
      nextStep() {
          if (this.step === 1) {
              this.step = 2;
          } else if (this.step === 2) {
              this.step = 3;
          }
      },
      generateReport() {
          this.loading = true;
          setTimeout(() => {
              this.report = `
Relatório de Ordem de Serviço

Unidade: ${this.unit}

Técnico: ${this.techName}

Data: ${this.formatDate(this.date)}

Custos: R$${this.cost.toFixed(2)}

Horário de Chegada: ${this.arrivalTime}

Horário de Saída: ${this.departureTime}

Tempo de Permanência: ${this.timeDifference} minutos

Supervisor(a): ${this.supervisor}

O que foi feito: ${this.taskDetails}

Pendências: ${this.pendingIssues || 'Não houveram pendências'}
              `.trim();
              this.loading = false;
              this.step = 4;
          }, 2000);
      },
      copyReport() {
          navigator.clipboard.writeText(this.report)
              .then(() => {
                  this.showCopyAlert = true;
                  setTimeout(() => {
                      this.showCopyAlert = false;
                  }, 3000); // Oculta o alerta após 3 segundos
              })
              .catch(err => alert('Erro ao copiar relatório: ', err));
      },
      formatDate(date) {
          const [year, month, day] = date.split('-');
          return `${day}/${month}/${year}`;
      }
  }
});

app.mount('#app');
