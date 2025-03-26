<?php

namespace App\Http\Controllers;



use App\Models\Facture;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class FactureController extends Controller
{
    function chifre_en_lettre($montant, $devise1 = '', $devise2 = '')
    {
        if (empty($devise1)) $dev1 = 'Dinars';
        else $dev1 = $devise1;
        if (empty($devise2)) $dev2 = 'Centimes';
        else $dev2 = $devise2;
        $valeur_entiere = intval($montant);
        $valeur_decimal = intval(round($montant - intval($montant), 2) * 100);
        $dix_c = intval($valeur_decimal % 100 / 10);
        $cent_c = intval($valeur_decimal % 1000 / 100);
        $unite[1] = $valeur_entiere % 10;
        $dix[1] = intval($valeur_entiere % 100 / 10);
        $cent[1] = intval($valeur_entiere % 1000 / 100);
        $unite[2] = intval($valeur_entiere % 10000 / 1000);
        $dix[2] = intval($valeur_entiere % 100000 / 10000);
        $cent[2] = intval($valeur_entiere % 1000000 / 100000);
        $unite[3] = intval($valeur_entiere % 10000000 / 1000000);
        $dix[3] = intval($valeur_entiere % 100000000 / 10000000);
        $cent[3] = intval($valeur_entiere % 1000000000 / 100000000);
        $chif = array('', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix sept', 'dix huit', 'dix neuf');
        $secon_c = '';
        $trio_c = '';
        for ($i = 1; $i <= 3; $i++) {
            $prim[$i] = '';
            $secon[$i] = '';
            $trio[$i] = '';
            if ($dix[$i] == 0) {
                $secon[$i] = '';
                $prim[$i] = $chif[$unite[$i]];
            } else if ($dix[$i] == 1) {
                $secon[$i] = '';
                $prim[$i] = $chif[($unite[$i] + 10)];
            } else if ($dix[$i] == 2) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'vingt et';
                    $prim[$i] = $chif[$unite[$i]];
                } else {
                    $secon[$i] = 'vingt';
                    $prim[$i] = $chif[$unite[$i]];
                }
            } else if ($dix[$i] == 3) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'trente et';
                    $prim[$i] = $chif[$unite[$i]];
                } else {
                    $secon[$i] = 'trente';
                    $prim[$i] = $chif[$unite[$i]];
                }
            } else if ($dix[$i] == 4) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'quarante et';
                    $prim[$i] = $chif[$unite[$i]];
                } else {
                    $secon[$i] = 'quarante';
                    $prim[$i] = $chif[$unite[$i]];
                }
            } else if ($dix[$i] == 5) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'cinquante et';
                    $prim[$i] = $chif[$unite[$i]];
                } else {
                    $secon[$i] = 'cinquante';
                    $prim[$i] = $chif[$unite[$i]];
                }
            } else if ($dix[$i] == 6) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'soixante et';
                    $prim[$i] = $chif[$unite[$i]];
                } else {
                    $secon[$i] = 'soixante';
                    $prim[$i] = $chif[$unite[$i]];
                }
            } else if ($dix[$i] == 7) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'soixante et';
                    $prim[$i] = $chif[$unite[$i] + 10];
                } else {
                    $secon[$i] = 'soixante';
                    $prim[$i] = $chif[$unite[$i] + 10];
                }
            } else if ($dix[$i] == 8) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'quatre-vingts et';
                    $prim[$i] = $chif[$unite[$i]];
                } else {
                    $secon[$i] = 'quatre-vingt';
                    $prim[$i] = $chif[$unite[$i]];
                }
            } else if ($dix[$i] == 9) {
                if ($unite[$i] == 1) {
                    $secon[$i] = 'quatre-vingts et';
                    $prim[$i] = $chif[$unite[$i] + 10];
                } else {
                    $secon[$i] = 'quatre-vingts';
                    $prim[$i] = $chif[$unite[$i] + 10];
                }
            }
            if ($cent[$i] == 1) $trio[$i] = 'cent';
            else if ($cent[$i] != 0 || $cent[$i] != '') $trio[$i] = $chif[$cent[$i]] . ' cents';
        }

        $string = '';
        $chif2 = array('', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingts dix');
        $secon_c = $chif2[$dix_c];
        if ($cent_c == 1) $trio_c = 'cent';
        else if ($cent_c != 0 || $cent_c != '') $trio_c = $chif[$cent_c] . ' cents';

        if (($cent[3] == 0 || $cent[3] == '') && ($dix[3] == 0 || $dix[3] == '') && ($unite[3] == 1))
            $string .= $trio[3] . '  ' . $secon[3] . ' ' . $prim[3] . ' million ';
        else if (($cent[3] != 0 && $cent[3] != '') || ($dix[3] != 0 && $dix[3] != '') || ($unite[3] != 0 && $unite[3] != ''))
            $string .= $trio[3] . ' ' . $secon[3] . ' ' . $prim[3] . ' millions ';
        else
            $string .= $trio[3] . ' ' . $secon[3] . ' ' . $prim[3];

        if (($cent[2] == 0 || $cent[2] == '') && ($dix[2] == 0 || $dix[2] == '') && ($unite[2] == 1))
            $string .= ' mille ';
        else if (($cent[2] != 0 && $cent[2] != '') || ($dix[2] != 0 && $dix[2] != '') || ($unite[2] != 0 && $unite[2] != ''))
            $string .= $trio[2] . ' ' . $secon[2] . ' ' . $prim[2] . ' milles ';
        else
            $string .= $trio[2] . ' ' . $secon[2] . ' ' . $prim[2];

        $string .= $trio[1] . ' ' . $secon[1] . ' ' . $prim[1];

        $string .= ' ' . $dev1 . ' ';

        if (($cent_c == '0' || $cent_c == '') && ($dix_c == '0' || $dix_c == ''))
            $test = 0;
        else
            $string .= $trio_c . ' ' . $secon_c . ' ' . $dev2;
        return $string;
    }


    public function index(Request $request)
    {
        if (is_null(session('id'))) return redirect()->route('login');
    
        // Fetch factures with related data
        $factures = Facture::with(['user', 'payment'])
            ->join('payments', 'factures.payment_id', '=', 'payments.id')
            ->leftJoin('users as verifiers', 'payments.verified_by', '=', 'verifiers.id')
            ->whereDate('payments.created_at', '>=', $request->input('from', Carbon::now()->subMonth(2)->startOfMonth()->toDateString()))
            ->whereDate('payments.created_at', '<=', $request->input('to', Carbon::now()->endOfMonth()->toDateString()))
            ->orderBy('payments.verified_at', 'asc')
            ->select('factures.*', 'verifiers.name as verifier_name')
            ->get();
    
        return view('facture.index', compact('factures'));
    }
    public function createClient()
    {
       
    $clients = DB::table('users')->get();
    $payements = DB::table('payments')->get();
    return view('facture.create-client', compact('clients', 'payements'));
}
    
    // public function index()
    // {
    //     $factures = Facture::with('client')->latest()->get();
    //     return view('factures.index', compact('factures'));
    // }
   
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',  // Ensure user_id exists in the users table
            'payment_id' => 'required|exists:payments,id',  // Ensure payment_id exists in the payments table
            'payment_date' => 'required|date',  // Ensure payment_date is a valid date
            'factureable_type' => 'required|string',  // Ensure factureable_type is a string
            'numero_contrat' => 'required|integer',  // Ensure numero_contrat is an integer
            'montant' => 'required|numeric',  // Ensure montant is numeric
            // Add any other necessary validations...
        ]);
    
        // Retrieve the payment record from the 'payments' table using the payment_id
        $payment = Payment::find($validated['payment_id']);
        
        // Check if the payment exists
        if (!$payment) {
            return redirect()->back()->with('error', 'Le paiement spécifié n\'existe pas.');
        }
    
        // Retrieve the payment method from the payment record
        $paymentMethod = $payment->payment_method;
    
        // Generate the invoice number (you can adjust this method as per your logic)
        $factureNum = $this->generateFactureNumber(); 
    
        // Create the facture record and store it in the database
        $facture = Facture::create([
            'user_id' => $validated['user_id'],  // Store the user_id in the facture table
            'payment_id' => $validated['payment_id'],  // Store the payment_id in the facture table
            'facture_num' => $factureNum,  // Store the generated invoice number
            'factureable_type' => $validated['factureable_type'],  // Store the factureable_type
            'numero_contrat' => $validated['numero_contrat'],  // Store the contract number
            'montant' => $payment->montant,  // Store the montant from the payment record
            'payment_date' => $validated['payment_date'],  // Store the payment date
            'payment_method' => $paymentMethod,  // Store the payment method
            'intern' => $request->intern,  // Store the intern value (if applicable)
            'client_name' => User::find($validated['user_id'])->name,  // Store the client's name
        ]);
    
        // Redirect to the facture index page with a success message
        return redirect()->route('factures.all')->with('success', 'Facture créée avec succès');
    }
    public function listFactures()
{
    $factures = Facture::with(['payment', 'user'])->get();
    return view('facture.index', compact('factures'));
}
    

public function generateFactureNumber()
{
    // Obtenir l'année actuelle
    $currentYear = date('Y');

    // Récupérer le dernier numéro de facture créé (si nécessaire pour l'incrémentation)
    $lastFacture = Facture::latest('id')->first();

    // Si aucune facture n'existe, démarrer à partir de 1
    $lastNumber = $lastFacture ? (int) substr($lastFacture->facture_num, -5) : 0;

    // Incrémenter le dernier numéro
    $newNumber = str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT); // Assure que le numéro est sur 5 chiffres

    // Générer le nouveau numéro de facture
    return $currentYear . $newNumber; // Exemple : 202500001
}

    



    public function payments(Request $request)
    {
        if (is_null(session('id'))) return redirect()->route('login');

        $fromDate = $request->input('from');
        $toDate = $request->input('to');

        $paymentMethod = $request->input('payment_method');
        $verifierName = $request->input('verifier_name');
        $month = $request->input('month');

        $paymentMethods = DB::table('payments')->select('payment_method')->distinct()->get();
        $verifiers = DB::table('users')
            ->join('payments', 'users.id', '=', 'payments.verified_by')
            ->select('users.name', 'users.id')
            ->distinct()
            ->get();

        $paiments_query = DB::table('payments');

        $paiments_query->leftJoin('factures', function ($q) {
            $q->on('payments.id', '=', 'factures.payment_id');
            $q->whereNull('factures.deleted_at');
        })
            ->join('users as verifiers', 'payments.verified_by', '=', 'verifiers.id')
            ->select(
                'payments.id as payment_id',
                'payments.num_transaction',
                'payments.montant',
                'payments.recu',
                'payments.month',
                DB::raw('DATE(payments.verified_at) as verified_at'),
                DB::raw('DATE(payments.created_at) as created_at'),
                'payments.payment_method',
                'factures.id as facture_id',
                'verifiers.name as responsable_name',
            )
            // Filter between from and to dates
            ->when($fromDate && $toDate, function ($query) use ($fromDate, $toDate) {
                return $query->whereDate('payments.created_at', '>=', $fromDate);
                return $query->whereDate('payments.created_at', '<=', $toDate);
            })
            ->when($month, function ($query) use ($month) {
                return $query->where('payments.month', $month);
            })
            // Filter by payment method
            ->when($paymentMethod, function ($query) use ($paymentMethod) {
                return $query->where('payments.payment_method', $paymentMethod);
            })
            // Ensure that montant is greater than 0
            ->where('payments.montant', '>', 0);

        if ($paymentMethod || $verifierName || $month || ($fromDate && $toDate)) {
            $factures = $paiments_query->get();
        } else {
            $factures = [];
        }

        $french_months = [
            1 => 'Janvier',
            2 => 'Février',
            3 => 'Mars',
            4 => 'Avril',
            5 => 'Mai',
            6 => 'Juin',
            7 => 'Juillet',
            8 => 'Août',
            9 => 'Septembre',
            10 => 'Octobre',
            11 => 'Novembre',
            12 => 'Décembre'
        ];

        return view('facture.payments', compact('factures', 'french_months', 'fromDate', 'toDate', 'paymentMethods', 'verifiers'));
    }

    public function print(Request $request)
    {
        if (session('id') === null) redirect('/Login');
        $factureId = decrypt($request->query('id'));
        // $type = $request->query('type');
        // return $factureId;
        // if($type === 'CR') {
        $facture = Facture::whereId($factureId)
            ->with([
                'User:name,id,email',
                'Payment:id,num_transaction,montant,updated_at,payment_method,verified_at',
            ])
            ->first();
        // return $facture;
        // }
        // return "ueuueue";
        // else {
        //     $facture = Facture::whereId($factureId)
        //     ->with(['user:name,id,email', 'payment:id,num_transaction,modality,montant', 'category:id,prefix'])
        //     ->firstOrFail(['id', 'facture_num', 'user_id', 'intern', 'payment_id', 'factureable_type', 'factureable_id', 'category_id']);
        // }
        // return "hhehe";

        $tva = boolval($facture->intern);
        // return $facture->intern;
        $facture->TTC = $facture->Payment->montant;

        if ($tva) {
            $facture->HT = $facture->Payment->montant / 1.2;
            $facture->TVA =  $facture->Payment->montant - $facture->HT;
        }

        // return $facture;
        $designation = 'TEST';

        // echo var_dump($facture->TTC);

        $facture->amountWords = $facture->mantant_enlettre ?? $this->chifre_en_lettre($facture->TTC, 'MAD');
        // $facture->amountWords = number_format($facture->TTC, 2) . ' dirhams';

        $facture->facture_num = $facture->facture_num ?? '___________';

        if ($facture->facture_num) {
            while (strlen($facture->facture_num) < 5) {
                $facture->facture_num = 0 . $facture->facture_num;
            }
            $facture->facture_num .= '/' . Carbon::parse($facture->created_at)->format('Y');
        }

        return view('facture.invoice', compact('facture', 'designation', 'tva'));
    }

    public function updateIntern(Request $request, $id)
    {
        if (session('id') === null) response()->json('Unauthenticated', 401);
        $facture = Facture::find(decrypt($id));
        $facture->intern = $request->tva;
        $facture->update();
        return response()->json(['message' => 'update successfully']);
    }

    public function update(Request $request)
    {
        if (session('id') === null) response()->json('Unauthenticated', 401);

        $facture = Facture::find($request->input('facture'));
        $facture->update([
            'intern' => $request->input('tva'),
            'facture_num' => $request->input('num'),
            'client_name' => $request->input('clientName'),
            'montant_enlettre' => $request->input('mantantEnLettre'),
        ]);

        $facture->Payment->update([
                'verified_at' => $request->input('date'),
                'montant' => $request->input('montant'),
                'updated_by' => decrypt(session('id')),
                'updated_at' => now(),
                'update_justification' => $request->input('justification')
            ]);
        return redirect()->to("/factures#ID$facture->id");
    }


    public function reset($id)
    {
        if (session('id') === null) response()->json('Unauthenticated', 401);

        $facture = Facture::find($id);
        $facture->category_id = null;
        $facture->intern = null;
        $facture->facture_num = 0;

        $facture->update();

        return redirect()->to("/factures#ID$facture->id");
    }

    public function show($factureId, $categoryId)
    {
        if (session('id') === null) response()->json('Unauthenticated', 401);
        try {
            // $categoryId = $request->categoryId;
            // return response()->json(Facture::where('category_id', $categoryId)->orderBy('facture_num', 'DESC')->first('facture_num')?->facture_num ?? 0);
            $facture = Facture::whereId($factureId)->firstOrFail();
            $facture->category_id = $categoryId;
            $facture->facture_num = (Facture::where('category_id', $categoryId)->orderBy('facture_num', 'DESC')->first('facture_num')?->facture_num ?? 0) + 1;
            // $facture->update();
            return response()->json([
                'message' => 'updated successfully',
                'factureCategoryNum' => $facture->category->prefix . $facture->facture_num,
                // 'facture_num' => $facture->facture_num
            ]);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    public function getStatus(Request $request)
    {
        if (session('id') === null) response()->json('Unauthenticated', 401);

        $facture = Facture::with('payment')->where('id', $request->query('f'))->select()->first();

        if ($facture->facture_num) $number = $facture->facture_num;
        else $number = (DB::table('factures')->orderBy('facture_num', 'DESC')->select('facture_num')->first()?->facture_num ?? 1) + 1;

        return response()->json([
            'factureNum' => $number,
            'tva' => $facture->intern,
            'category' => $facture->category_id,
            'date' => $facture->payment->verified_at ? date('Y-m-d', strtotime($facture->payment->verified_at)) : null,
            'montant' => $facture->payment->montant,
            'justification' => $facture->payment->update_justification,
            'clientname' => $facture->client_name ??  $facture->user->name,
            'mantantEnLettre' => $facture->mantant_enlettre ? $facture->mantant_enlettre : $this->chifre_en_lettre($facture->payment->montant, 'MAD')
        ]);
    }

    public function checkNumExistence(Request $request)
    {
        if (session('id') === null) response()->json('Unauthenticated', 401);

        $factureNumExists = DB::table('factures')
            ->where('id', '!=', $request->query('f'))
            ->where('facture_num', $request->query('v'))
            ->whereYear('created_at', '=', now()->year)
            ->exists();

        return response()->json($factureNumExists);
    }

    public function generatePaymentFacture($paymentId)
    {
        try {
            $paymentId = decrypt($paymentId);
            $payment = DB::table('payments')->where('id', $paymentId)->first();
            if (!$payment) {
                return response()->json(['status' => 'error', 'message' => 'Payment not found.'], 404);
            }
            if (Facture::where('payment_id', $payment->id)->exists()) {
                return response()->json(['status' => 'error', 'message' => 'Facture already exists.'], 409);
            }
            Facture::create([
                'payment_id' => $payment->id,
                'user_id' => decrypt(session('id')),
            ]);
            return response()->json(['status' => 'success', 'message' => 'Facture generated successfully.']);
        } catch (\Exception $e) {
            Log::error("Error generating facture: " . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Failed to generate facture.'], 500);
        }
    }

    public function ValidatePayment(Payment $payment)
    {
        try {
            if ($payment->verified_at != null) {
                return response()->json(['status' => 'error', 'message' => 'Payment already verified.'], 409);
            }
            $payment->update([
                'verified_at' => now(),
            ]);
            return response()->json(['status' => 'success', 'message' => 'Payment verified successfully.']);
        } catch (\Exception $e) {
            Log::error("Error generating facture: " . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Failed to verifiy payment.'], 500);
        }
    }

    public function deleteFacture($id)
    {
        Facture::whereId($id)->delete();
        return back();
    }
}
