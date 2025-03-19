<?php

namespace App\Models;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FactureMail extends Mailable
{
    use Queueable, SerializesModels;

    public $facture;
    public $pdf;

    public function __construct($facture, $pdf)
    {
        $this->facture = $facture;
        $this->pdf = $pdf;
    }

    public function build()
    {
        return $this->subject('Votre Facture')
                    ->view('emails.facture')
                    ->attachData($this->pdf, "Facture_{$this->facture->id}.pdf", [
                        'mime' => 'application/pdf',
                    ]);
    }
}

