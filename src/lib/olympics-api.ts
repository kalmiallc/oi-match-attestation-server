/**
 * Olympics API URL.
 */
const OLYMPICS_API_URL = "https://sph-s-api.olympics.com/summer/schedules/api/ENG/schedule/discipline";

/**
 * Get sport string by sport index.
 * @param sportIndex Sport index.
 * @returns Sport string.
 */
function getDisciplineBySportIndex(sportIndex: string): string {
    const discipline: { [key: string]: string } = {
        "0": "BKB", // Basketball
        "1": "BK3", // Basketball 3x3
        "2": "BDM", // Badminton
        "3": "VBV", // Beach Volley
        "4": "HOC", // Field Hockey
        "5": "FBL", // Football
        "6": "HBL", // Handball
        "7": "TTE", // Table Tennis
        "8": "TEN", // Tennis
        "9": "VVO", // Volleyball
        "10": "WPO", // Water Polo
    };

    return discipline[sportIndex];
}

/**
 * Get gender string by gender index.
 * @param genderIndex Gender index.
 * @returns Gender string.
 */
function getGenderCodeByIndex(genderIndex: string): string | null {
    if (genderIndex === "0") {
        return "M";
    } else if (genderIndex === "1") {
        return "W";
    }

    return null;
}

/**
 * Converts date string to UTC timestamp.
 * @param dateString Date string.
 * @returns UTC timestamp.
 */
function toUtcTimestamp(dateString: string): string {
    const date = new Date(dateString);
    const utcDateTime = date.toISOString();

    return (new Date(utcDateTime).getTime() / 1000).toString();
}

/**
 * Returns schedule fpr specific sport.
 * @param sportIndex Sport index.
 * @returns Schedule.
 */
async function getSchedule(discipline: string): Promise<any[]> {
    try {
        const res = await fetch(`${OLYMPICS_API_URL}/${discipline}`);
        const schedule = await res.json();

        return schedule?.units || [];
    } catch (error) {
        return [];
    }
}

/**
 * Creates timestamp for validation.
 * @param startTime Match start time.
 * @param teamScoreA Match team A result.
 * @param teamScoreB Match team B result.
 * @returns Timestamp.
 */
function createTimestamp(startTime: string, teamScoreA: string, teamScoreB: string): string | null {
    if (teamScoreA === "" || teamScoreB === "") {
        return null;
    }

    const resultsA = Number(teamScoreA);
    const resultsB = Number(teamScoreB);
    if (!isNumber(resultsA) || !isNumber(resultsB)) {
        return null;
    }

    return (Number(startTime) + resultsA + resultsB).toString();
}

/**
 * Checks if given value is a number.
 * @param value Value to check.
 * @returns Boolean.
 */
function isNumber(value: any): boolean {
    return typeof value === "number" && !isNaN(value);
}

/**
 * Validates teams.
 * @param event Event object.
 * @param teamA Team A.
 * @param teamB Team B.
 * @returns True if teams are valid.
 */
function validateTeams(event: any, teamA: string, teamB: string): boolean {
    const competitors = event?.competitors || [];

    return !!competitors.find((c: any) => c.name === teamA) && !!competitors.find((c: any) => c.name === teamB);
}

/**
 * Parses winner from obtained results.
 * @param result Obtained results.
 * @param teams Event teams.
 * @returns Winner index.
 */
function parseWinner(resultsA: string, resultsB: string): string | null {
    if (resultsA === "W") {
        return "1";
    }

    if (resultsB === "W") {
        return "2";
    }

    if (resultsA === "T" && resultsB === "T") {
        return "3";
    }

    return null;
}

/**
 * Gets event results.
 * @param teamsString Teams string.
 * @param genderIndex Gender index.
 * @param sportIndex Sport index.
 * @param startTime Event start time.
 * @returns Event winner & timestamp.
 */
export async function getEventResults(
    teamsString: string,
    genderIndex: string,
    sportIndex: string,
    startTime: string,
): Promise<{ winner: string | null; ts: string | null }> {
    const teams = teamsString.split(",");
    const teamA = teams[0];
    const teamB = teams[1];

    const discipline = getDisciplineBySportIndex(sportIndex);
    const genderCode = getGenderCodeByIndex(genderIndex);

    const events = await getSchedule(discipline);
    if (!events) {
        return { winner: null, ts: null };
    }

    const event = events.find(
        (e) => e.status === "FINISHED" && e.genderCode === genderCode && toUtcTimestamp(e.startDate) === startTime && validateTeams(e, teamA, teamB),
    );
    if (!event) {
        return { winner: null, ts: null };
    }

    const resultsA = event.competitors.find((c: any) => c.name === teamA).results;
    const resultsB = event.competitors.find((c: any) => c.name === teamB).results;

    const winner = parseWinner(resultsA.winnerLoserTie, resultsB.winnerLoserTie);
    const ts = createTimestamp(startTime, resultsA.mark, resultsB.mark);

    return { winner, ts };
}
