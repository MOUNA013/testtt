<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Bootstrap css -->
    <link href="{{ asset('assets/plugins/bootstrap/css/bootstrap.css') }}" rel="stylesheet" />
    <title>{{ $facture->user->name }} facture</title>
    <style>
        body {
            font-size: 13px;
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
                -moz-print-color-adjust: exact;
                -o-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }

        .invoice {
            background: #fff;
            width: 100%;
            padding: 60px 40px;
        }

        .logo {
            width: 6cm;
            margin-top: 1.3rem;
        }

        .document-type {
            text-align: right;
            color: #666;
            font-size: 1.5em;
        }

        .conditions {
            font-size: 1em;
            color: #666;
        }

        .bottom-page {
            font-size: 0.7em;
            margin-top: 7rem;
            background-color: #F2F2F2;
        }

        .client-info {
            margin-top: 4rem;
        }

        .designation {
            background-color: #B4C6E7 !important;
        }

        .designation td:not(.designation td:last-child) {
            border-right: 1px solid #fff;
        }

        .table-2 {
            background-color: #F2F2F2;
        }
    </style>
</head>

<body>
    <div class="invoice">
        <div class="row align-items-center mb-2">
            <div class="col-7 p-0">
                <img src="{{ asset('assets/images/brand/yschool-logo.png') }}" class="logo">
            </div>
            <div class="col-5">
                <h3 class="document-type mt-4">Facture N°  {{  $facture->facture_num }}</h3>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-8 pe-5">
                <p class="w-75">
                    YSCHOOL <br />
                    Villa 24 rue 19 missimi oulfa,
                    Casablanca<br />
                    Email Address : welcome@yool.education <br />
                    +212 693 044 674
                </p>
                <div class="border-bottom border-top py-3 w-75 client-info">
                    <div class="mb-1">client : {{ $facture->client_name ??  $facture->user->name }}</div>
                    <div class="">email : {{ $facture->user->email }}</div>
                </div>
            </div>
            <div class="col-4 text-center d-flex flex-column justify-content-between">
                <div>
                    <div class="border-bottom pb-2">DATE</div>
                    <div class="mb-3 border-bottom py-2">
                        {{ Carbon\Carbon::parse($facture->Payment->verified_at)->format('d/m/Y') }}</div>
                </div>

                <div class="border-bottom border-top" style="padding: 26.4px 0;">
                    <table class="mx-auto">
                        <tr>
                            <td>numéro transaction :</td>
                            <td>{{ $facture->Payment->num_transaction }}</td>
                        </tr>
                        <tr>
                            <td>paiement méthode :</td>
                            <td class="text-start">{{ __($facture->Payment->payment_method) }}</td>
                        </tr>
                    </table>
                    
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="row">
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th>Désignation</th>
                        <th>Quantité</th>
                        {{-- <th>tranche</th> --}}
                        <th>Montant</th>
                    </tr>
                </thead>
                <tbody class="designation">
                    <tr>
                        <td class="col-6">{{ $designation }}</td>
                        <td>1</td>
                        <td class="col-4">{{ number_format($facture->Payment->montant, 2) }} DH</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="col-8">
            </div>
            <div class="col-4 p-0">
                <table class="table text-end table-2">
                    @if ($tva)
                        <tr>
                            <td class="text-start"><strong>Total (HT)</strong></td>
                            <td class="text-end">{{ number_format($facture->HT, 2) }} DH</td>
                        </tr>
                        <tr>
                            <td class="text-start"><strong>Total (TVA)</strong></td>
                            <td class="text-end">{{ number_format($facture->TVA, 2) }} DH</td>
                        </tr>
                        
                        <tr>
                            <td class="text-start"><strong>Total (TTC)</strong></td>
                            <td class="text-end">{{  number_format($facture->TTC, 2) }} DH</td>
                        </tr>
                    @else
                        <tr>
                            <td class="text-start"><strong>Total (TTC)</strong></td>
                            <td class="text-end">{{ number_format($facture->TTC, 2) }} DH</td>
                        </tr>
                    @endif
                </table>
            </div>
        </div>

        <div class="conditions fst-italic">
            Arrêter la présente facture au montant de
            <strong>{{ $facture->amountWords }} TTC</strong>
        </div>


        <div class="bottom-page p-2 border-top">
            <p class="">
                Villa 24 rue 19 missimi oulfa,<br>
                Casablanca<br>
                ICE : 003037511000024IF : 5240816 RC : 540227 <br>
                RIB : 230 780 4441618221009500 64
            </p>
            <p class="text-end mt-3">
                welcome@yool.education <br />
                +212 693 044 674
            </p>
        </div>
    </div>

    <script>
        // function generatePDF() {
        //     // Choose the element that our invoice is rendered in.
        //     const element = document.querySelector(".invoice");
        //     // Choose the element and save the PDF for our user.
        //     html2pdf()
        //         .set({
        //             html2canvas: {
        //                 scale: 4
        //             },
        //         })
        //     addImage(img, "PNG", 0)
        //         .from(element)
        //         .save('<?= $facture->user->name ?>');
        // }
        // generatePDF()
        window.onload = () => print()
    </script>
</body>

</html>
