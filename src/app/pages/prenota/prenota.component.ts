import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { MockDataService } from '../../data/mock-data.service';
import type { Corso } from '../../data/types';

interface PrenotaFormShape {
  nome: FormControl<string>;
  email: FormControl<string>;
  telefono: FormControl<string>;
  primaVoltaGratuita: FormControl<boolean>;
  dataPreferita: FormControl<string>;
  oraPreferita: FormControl<string>;
  corsiInteressati: FormArray<FormControl<boolean>>;
  esperienzaFitness: FormControl<string>;
  obiettivi: FormControl<string>;
  privacy: FormControl<boolean>;
}

@Component({
  selector: 'app-prenota',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota il tuo allenamento</h1>
        <p>Compila il form e ti ricontattiamo entro 24h. La prima sessione è sempre gratuita.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="prenota-grid">
        <section class="info-col">
          <h2>Informazioni utili</h2>

          <div class="info-card info-card--success">
            <span class="info-card__icon" aria-hidden="true">🎁</span>
            <div>
              <strong>Prima sessione GRATUITA</strong>
              <p>Vieni a provare qualsiasi corso senza impegno. Un trainer ti accoglierà e seguirà per tutta la durata.</p>
            </div>
          </div>

          <div class="info-card">
            <span class="info-card__icon" aria-hidden="true">📞</span>
            <div>
              <strong>Contattaci direttamente</strong>
              <p>
                <a href="tel:+390114567890">+39 011 456 7890</a><br />
                <a href="mailto:info@forgefitness.it">info&#64;forgefitness.it</a>
              </p>
            </div>
          </div>

          <div class="info-card">
            <span class="info-card__icon" aria-hidden="true">📍</span>
            <div>
              <strong>Dove siamo</strong>
              <p>Corso Vittorio Emanuele II 145<br />10138 Torino<br />Parcheggio gratuito 30 posti</p>
            </div>
          </div>

          <div class="orari-block">
            <h3>Orari di apertura</h3>
            <ul class="orari-list">
              <li><span>Lun – Ven</span><span>06:30 – 22:00</span></li>
              <li><span>Sabato</span><span>08:00 – 20:00</span></li>
              <li><span>Domenica</span><span>09:00 – 13:00</span></li>
            </ul>
          </div>
        </section>

        <section class="form-col">
          <ng-container *ngIf="!submitted(); else thankyou">
            <h2>Richiesta prenotazione</h2>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
              <div class="field">
                <label for="nome">Nome e cognome <span class="required" aria-hidden="true">*</span></label>
                <input
                  id="nome"
                  type="text"
                  formControlName="nome"
                  autocomplete="name"
                  [class.field__input--error]="isInvalid('nome')"
                  required
                />
                <span *ngIf="isInvalid('nome')" class="field__error" role="alert">Inserisci nome e cognome</span>
              </div>

              <div class="field">
                <label for="email">Email <span class="required" aria-hidden="true">*</span></label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  autocomplete="email"
                  [class.field__input--error]="isInvalid('email')"
                  required
                />
                <span *ngIf="isInvalid('email')" class="field__error" role="alert">Inserisci un'email valida</span>
              </div>

              <div class="field">
                <label for="telefono">Telefono <span class="required" aria-hidden="true">*</span></label>
                <input
                  id="telefono"
                  type="tel"
                  formControlName="telefono"
                  autocomplete="tel"
                  [class.field__input--error]="isInvalid('telefono')"
                  required
                />
                <span *ngIf="isInvalid('telefono')" class="field__error" role="alert">Inserisci un numero valido</span>
              </div>

              <div class="field field--checkbox field--success">
                <input id="primaVoltaGratuita" type="checkbox" formControlName="primaVoltaGratuita" />
                <label for="primaVoltaGratuita">
                  <span class="badge-gratis">GRATIS</span> Prima sessione gratuita — non ho ancora visitato Forge Fitness
                </label>
              </div>

              <div class="row">
                <div class="field">
                  <label for="dataPreferita">Data preferita <span class="required" aria-hidden="true">*</span></label>
                  <input id="dataPreferita" type="date" formControlName="dataPreferita" required />
                </div>
                <div class="field">
                  <label for="oraPreferita">Ora preferita <span class="required" aria-hidden="true">*</span></label>
                  <input id="oraPreferita" type="time" formControlName="oraPreferita" required />
                </div>
              </div>

              <fieldset class="field fieldset-corsi">
                <legend>Corsi di interesse <span class="hint">(seleziona uno o più)</span></legend>
                <div class="corsi-checkbox-grid" *ngIf="nomiCorsi().length > 0">
                  <label
                    *ngFor="let nome of nomiCorsi(); let i = index"
                    class="checkbox-label"
                  >
                    <input type="checkbox" [formControl]="getCorsoControl(i)" />
                    {{ nome }}
                  </label>
                </div>
              </fieldset>

              <div class="field">
                <label for="esperienzaFitness">Esperienza fitness</label>
                <select id="esperienzaFitness" formControlName="esperienzaFitness">
                  <option value="">-- Seleziona --</option>
                  <option value="principiante">Principiante (mai fatto palestra)</option>
                  <option value="base">Base (ho fatto palestra saltuariamente)</option>
                  <option value="intermedio">Intermedio (mi alleno regolarmente)</option>
                  <option value="avanzato">Avanzato (atleta / agonista)</option>
                </select>
              </div>

              <div class="field">
                <label for="obiettivi">I tuoi obiettivi</label>
                <textarea
                  id="obiettivi"
                  formControlName="obiettivi"
                  rows="3"
                  placeholder="Es: perdere peso, aumentare massa muscolare, migliorare resistenza, ridurre stress..."
                ></textarea>
              </div>

              <div class="field field--checkbox">
                <input id="privacy" type="checkbox" formControlName="privacy" required />
                <label for="privacy">
                  Accetto la privacy policy e il trattamento dei dati personali ai fini della gestione della richiesta.
                  <span class="required" aria-hidden="true">*</span>
                </label>
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
                Invia richiesta
              </button>

              <p class="form-disclaimer">
                Demo non funzionale: nessuna prenotazione viene realmente inviata. Per prenotare contatta il numero sopra.
              </p>
            </form>
          </ng-container>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">✅</span>
              <h2>Richiesta inviata!</h2>
              <p>Grazie <strong>{{ form.value.nome }}</strong>! Ti ricontatteremo entro 24h al
                <strong>{{ form.value.telefono }}</strong>.</p>
              <p *ngIf="form.value.primaVoltaGratuita" class="gratis-msg">
                La tua prima sessione è <strong>gratuita</strong> — ci vediamo presto!
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: linear-gradient(180deg, #fff1f1 0%, var(--color-bg-subtle) 100%);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
        font-size: 2rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem 4rem;
      }
      .prenota-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        align-items: start;
      }

      /* Info col */
      .info-col h2 {
        margin: 0 0 1.5rem;
        font-size: 1.4rem;
      }
      .info-card {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        margin-bottom: 1rem;
      }
      .info-card--success {
        background: #f0fdf4;
        border-color: #bbf7d0;
      }
      .info-card__icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }
      .info-card strong {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.95rem;
      }
      .info-card p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .info-card a {
        color: var(--color-accent);
      }
      .orari-block {
        margin-top: 1.5rem;
      }
      .orari-block h3 {
        margin: 0 0 0.75rem;
        font-size: 1rem;
        font-weight: 700;
      }
      .orari-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .orari-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.45rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }

      /* Form col */
      .form-col {
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        padding: 2rem;
      }
      .form-col h2 {
        margin: 0 0 1.5rem;
        font-size: 1.4rem;
      }
      .field {
        margin-bottom: 1.25rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.55rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field__input--error {
        border-color: var(--color-danger) !important;
      }
      .field__error {
        font-size: 0.78rem;
        color: var(--color-danger);
        margin-top: 0.2rem;
      }
      .required {
        color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.6rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        line-height: 1.4;
      }
      .field--success label {
        color: var(--color-success);
        font-weight: 600;
      }
      .badge-gratis {
        display: inline-block;
        background: var(--color-success);
        color: #ffffff;
        font-size: 0.68rem;
        font-weight: 700;
        padding: 0.1rem 0.4rem;
        border-radius: var(--radius-sm);
        vertical-align: middle;
        margin-right: 0.25rem;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .fieldset-corsi {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1rem;
        margin-bottom: 1.25rem;
      }
      .fieldset-corsi legend {
        font-size: 0.85rem;
        font-weight: 600;
        padding: 0 0.25rem;
      }
      .hint {
        font-weight: 400;
        color: var(--color-fg-muted);
        font-size: 0.8rem;
      }
      .corsi-checkbox-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 0.4rem;
        margin-top: 0.75rem;
      }
      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.85rem;
        cursor: pointer;
      }
      .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        font-weight: 700;
        font-size: 0.95rem;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
        text-decoration: none;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
      }
      .btn-primary:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        text-align: center;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou__icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h2 {
        margin: 0 0 0.75rem;
        color: var(--color-success);
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
      }
      .gratis-msg {
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: var(--radius-md);
        padding: 0.75rem 1rem;
        color: var(--color-success) !important;
        margin-bottom: 1.5rem !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrenotaComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly submitted = signal(false);

  private readonly corsiRaw = toSignal(
    this.mockData.corsi$.pipe(map((d) => d.corsi)),
    { initialValue: [] as Corso[] }
  );

  readonly nomiCorsi = () => this.corsiRaw().map((c) => c.nome);

  readonly form = this.fb.nonNullable.group<PrenotaFormShape>({
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    telefono: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[+0-9 ]{6,}$/)
    ]),
    primaVoltaGratuita: this.fb.nonNullable.control(true),
    dataPreferita: this.fb.nonNullable.control('', Validators.required),
    oraPreferita: this.fb.nonNullable.control('', Validators.required),
    corsiInteressati: this.fb.array<FormControl<boolean>>([]),
    esperienzaFitness: this.fb.nonNullable.control(''),
    obiettivi: this.fb.nonNullable.control(''),
    privacy: this.fb.nonNullable.control(false, Validators.requiredTrue)
  });

  constructor() {
    // Usa effect() per inizializzare il FormArray in modo SSR-safe
    // L'effect reagisce al signal dei corsi e popola i controlli in modo idempotente
    effect(() => {
      const corsi = this.corsiRaw();
      const fa = this.form.controls.corsiInteressati;
      if (corsi.length > 0 && fa.length === 0) {
        corsi.forEach(() => fa.push(this.fb.nonNullable.control(false)));
      }
    });
  }

  getCorsoControl(index: number): FormControl<boolean> {
    return this.form.controls.corsiInteressati.at(index) as FormControl<boolean>;
  }

  isInvalid(field: keyof PrenotaFormShape): boolean {
    const ctrl = this.form.get(field);
    return ctrl !== null && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ primaVoltaGratuita: true, privacy: false });
    const fa = this.form.controls.corsiInteressati;
    fa.controls.forEach((c) => c.setValue(false));
    this.submitted.set(false);
  }
}
