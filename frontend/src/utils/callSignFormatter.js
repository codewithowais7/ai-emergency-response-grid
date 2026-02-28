/**
 * callSignFormatter.js
 * 
 * Utility to transform original NATO-style call signs (Alpha-1, Bravo-2, etc.)
 * into professional Indian EMS-style display names (DL-AMB-01, etc.)
 * for the UI layer only.
 */

const MAPPING = {
    "Alpha-1": "DL-AMB-01",
    "Alpha-2": "DL-AMB-02",
    "Bravo-1": "DL-AMB-03",
    "Bravo-2": "DL-AMB-04",
    "Charlie-1": "DL-AMB-05",
    "Charlie-2": "DL-AMB-06",
    "Delta-1": "DL-AMB-07",
    "Delta-2": "DL-AMB-08",
    "Echo-1": "DL-AMB-09",
    "Echo-2": "DL-AMB-10",
    // Fallbacks for updated backend names if they exist
    "108-DEL-ALS-01": "DL-AMB-01",
    "108-DEL-ALS-02": "DL-AMB-02",
    "102-DEL-BLS-03": "DL-AMB-03",
    "CATS-DEL-ALS-04": "DL-AMB-04",
    "CATS-DEL-BLS-05": "DL-AMB-05",
    "108-GGN-ALS-06": "DL-AMB-06",
    "102-GGN-BLS-07": "DL-AMB-07",
    "108-NOI-ALS-08": "DL-AMB-08",
    "102-NOI-BLS-09": "DL-AMB-09",
    "EMS-NCR-ALS-10": "DL-AMB-10"
};

export function transformCallSign(originalCallSign) {
    if (!originalCallSign) return "N/A";
    return MAPPING[originalCallSign] || originalCallSign;
}
