const pool = require("../../config/database");
const dateFormat = require("dateformat");

const validation = (data) => {
  const {
    id,
    first_name,
    other_names,
    last_name,
    mode_of_admission_id,
    application_type_id,
    academic_session_id,
    application_status,
    email,
    registration_number,
    user_id,
    maiden_name,
    date_of_birth,
    gender_id,
    religion_id,
    permanent_address,
    next_of_kin_name,
    next_of_kin_relationship,
    next_of_kin_address,
    next_of_kin_telephone,
    disability,
    telephone,
    mobile_phone,
    picture_url,
    picture_size,
    picture_type,
    postal_address,
    curricular_activities,
    application_number,
    date_submitted,
    admission_status,
    terms_agreed,
    attested,
    administrative_message,
    submitted,
    full_time,
    other_disability,
    last_updated,
    attester_name,
    attester_address,
    attester_profession,
    attester_phone,
    attester_position,
    current_addressof_place_of_work,
    permanent_home_address,
    home_town,
    contact_address_bw_now_and_sept,
    is_currently_in_educational_institution,
    name_of_current_institution,
    course_currently_doing,
    means_of_sponsorship,
    is_on_scholarship,
    name_of_scholarship_donor,
    number_of_children,
    proposed_profession_on_completion,
    application_payment_id,
    marital_status_id,
    nationality_id,
    state_of_origin_id,
    lga_id,
    nysc_year,
    nysc_location,
    sponsor_address,
    country_of_residence,
    religious_denomination_id,
    offline_applicant,
    misc1,
    misc2,
    misc3,
    misc4,
  } = data;
  let error = "";

  if (typeof misc1 !== "undefined" && !misc1) {
    if (misc1.length > 50) {
      return (error = {
        message: "misc1 has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "misc1 is required!" });
  }

  if (typeof misc2 !== "undefined" && !misc2) {
    if (misc2.length > 50) {
      return (error = {
        message: "misc2 has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "misc2 is required!" });
  }

  if (typeof misc3 !== "undefined" && !misc3) {
    if (misc3.length > 50) {
      return (error = {
        message: "misc3 has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "misc3 is required!" });
  }

  if (typeof misc4 !== "undefined" && !misc4) {
    if (misc4.length > 50) {
      return (error = {
        message: "misc4 has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "misc4 is required!" });
  }

  if (typeof country_of_residence !== "undefined" && !country_of_residence) {
    if (country_of_residence.length > 50) {
      return (error = {
        message:
          "country_of_residence has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "country_of_residence is required!" });
  }

  if (typeof sponsor_address !== "undefined" && !sponsor_address) {
    if (sponsor_address.length > 500) {
      return (error = {
        message:
          "sponsor_address has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "sponsor_address is required!" });
  }

  if (typeof nysc_location !== "undefined" && !nysc_location) {
    if (nysc_location.length > 50) {
      return (error = {
        message: "nysc_location has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "nysc_location is required!" });
  }

  if (typeof nysc_year !== "undefined" && !nysc_year) {
    if (nysc_year.length > 50) {
      return (error = {
        message: "nysc_year has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "nysc_year is required!" });
  }

  if (
    typeof religious_denomination_id !== "undefined" &&
    !Number.isInteger(religious_denomination_id)
  ) {
    return (error = {
      message: "religious_denomination_id is invalid/missing!",
    });
  }

  if (
    typeof offline_applicant !== "undefined" &&
    !Number.isInteger(offline_applicant)
  ) {
    return (error = { message: "offline_applicant is invalid/missing!" });
  }

  if (typeof lga_id !== "undefined" && !Number.isInteger(lga_id)) {
    return (error = { message: "lga_id is invalid/missing!" });
  }

  if (
    typeof proposed_profession_on_completion !== "undefined" &&
    !proposed_profession_on_completion
  ) {
    if (proposed_profession_on_completion.length > 50) {
      return (error = {
        message:
          "proposed_profession_on_completion has exceeded maximum character length of 50!",
      });
    }
    return (error = {
      message: "proposed_profession_on_completion is required!",
    });
  }

  if (
    typeof name_of_scholarship_donor !== "undefined" &&
    !name_of_scholarship_donor
  ) {
    if (name_of_scholarship_donor.length > 50) {
      return (error = {
        message:
          "name_of_scholarship_donor has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "name_of_scholarship_donor is required!" });
  }

  if (typeof means_of_sponsorship !== "undefined" && !means_of_sponsorship) {
    if (means_of_sponsorship.length > 50) {
      return (error = {
        message:
          "means_of_sponsorship has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "means_of_sponsorship is required!" });
  }

  if (
    typeof course_currently_doing !== "undefined" &&
    !course_currently_doing
  ) {
    if (course_currently_doing.length > 50) {
      return (error = {
        message:
          "course_currently_doing has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "course_currently_doing is required!" });
  }

  if (
    typeof name_of_current_institution !== "undefined" &&
    !name_of_current_institution
  ) {
    if (name_of_current_institution.length > 150) {
      return (error = {
        message:
          "name_of_current_institution has exceeded maximum character length of 150!",
      });
    }
    return (error = { message: "name_of_current_institution is required!" });
  }

  if (
    typeof number_of_children !== "undefined" &&
    !Number.isInteger(number_of_children)
  ) {
    return (error = { message: "number_of_children is invalid/missing!" });
  }

  if (
    typeof nationality_id !== "undefined" &&
    !Number.isInteger(nationality_id)
  ) {
    return (error = { message: "nationality_id is invalid/missing!" });
  }

  if (
    typeof state_of_origin_id !== "undefined" &&
    !Number.isInteger(state_of_origin_id)
  ) {
    return (error = { message: "state_of_origin_id is invalid/missing!" });
  }

  if (
    typeof is_currently_in_educational_institution !== "undefined" &&
    !Number.isInteger(is_currently_in_educational_institution)
  ) {
    return (error = {
      message: "is_currently_in_educational_institution is invalid/missing!",
    });
  }

  if (
    typeof is_on_scholarship !== "undefined" &&
    !Number.isInteger(is_on_scholarship)
  ) {
    return (error = { message: "is_on_scholarship is invalid/missing!" });
  }

  if (
    typeof application_payment_id !== "undefined" &&
    !Number.isInteger(application_payment_id)
  ) {
    return (error = { message: "application_payment_id is invalid/missing!" });
  }

  if (
    typeof marital_status_id !== "undefined" &&
    !Number.isInteger(marital_status_id)
  ) {
    return (error = { message: "marital_status_id is invalid/missing!" });
  }

  if (
    typeof contact_address_bw_now_and_sept !== "undefined" &&
    !contact_address_bw_now_and_sept
  ) {
    if (contact_address_bw_now_and_sept.length > 500) {
      return (error = {
        message:
          "contact_address_bw_now_and_sept has exceeded maximum character length of 500!",
      });
    }
    return (error = {
      message: "contact_address_bw_now_and_sept is required!",
    });
  }

  if (typeof home_town !== "undefined" && !home_town) {
    if (home_town.length > 50) {
      return (error = {
        message: "home_town has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "home_town is required!" });
  }

  if (
    typeof permanent_home_address !== "undefined" &&
    !permanent_home_address
  ) {
    if (permanent_home_address.length > 500) {
      return (error = {
        message:
          "permanent_home_address has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "permanent_home_address is required!" });
  }

  if (
    typeof current_addressof_place_of_work !== "undefined" &&
    !current_addressof_place_of_work
  ) {
    if (current_addressof_place_of_work.length > 500) {
      return (error = {
        message:
          "current_addressof_place_of_work has exceeded maximum character length of 500!",
      });
    }
    return (error = {
      message: "current_addressof_place_of_work is required!",
    });
  }

  if (typeof attester_position !== "undefined" && !attester_position) {
    if (attester_position.length > 50) {
      return (error = {
        message:
          "attester_position has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "attester_position is required!" });
  }

  if (typeof attester_phone !== "undefined" && !attester_phone) {
    if (attester_phone.length > 50) {
      return (error = {
        message: "attester_phone has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "attester_phone is required!" });
  }

  if (typeof attester_profession !== "undefined" && !attester_profession) {
    if (attester_profession.length > 50) {
      return (error = {
        message:
          "attester_profession has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "attester_profession is required!" });
  }

  if (typeof attester_address !== "undefined" && !attester_address) {
    if (attester_address.length > 500) {
      return (error = {
        message:
          "attester_address has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "attester_address is required!" });
  }

  if (typeof attester_name !== "undefined" && !attester_name) {
    if (attester_name.length > 50) {
      return (error = {
        message: "attester_name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "attester_name is required!" });
  }

  if (typeof last_updated !== "undefined" && !last_updated) {
    if (last_updated.length > 50) {
      return (error = {
        message: "last_updated has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "last_updated is required!" });
  }

  if (typeof other_disability !== "undefined" && !other_disability) {
    if (other_disability.length > 50) {
      return (error = {
        message:
          "other_disability has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "other_disability is required!" });
  }

  if (typeof submitted !== "undefined" && !Number.isInteger(submitted)) {
    return (error = { message: "submitted is invalid/missing!" });
  }

  if (typeof full_time !== "undefined" && !Number.isInteger(full_time)) {
    return (error = { message: "full_time is invalid/missing!" });
  }

  if (
    typeof administrative_message !== "undefined" &&
    !administrative_message
  ) {
    if (administrative_message.length > 50) {
      return (error = {
        message:
          "administrative_message has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "administrative_message is required!" });
  }

  if (typeof terms_agreed !== "undefined" && !Number.isInteger(terms_agreed)) {
    return (error = { message: "terms_agreed is invalid/missing!" });
  }

  if (typeof attested !== "undefined" && !Number.isInteger(attested)) {
    return (error = { message: "attested is invalid/missing!" });
  }

  if (
    typeof admission_status !== "undefined" &&
    !Number.isInteger(admission_status)
  ) {
    return (error = { message: "admission_status is invalid/missing!" });
  }

  if (
    typeof date_submitted !== "undefined" &&
    !dateFormat(date_submitted, "yyyy-mm-dd")
  ) {
    return (error = { message: "date_submitted is invalid/missing!" });
  }

  if (
    typeof application_status !== "undefined" &&
    !Number.isInteger(application_status)
  ) {
    return (error = { message: "application_status is invalid/missing!" });
  }

  if (typeof disability !== "undefined" && !disability) {
    if (disability.length > 50) {
      return (error = {
        message: "disability has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "disability is required!" });
  }

  if (typeof telephone !== "undefined" && !telephone) {
    if (telephone.length > 50) {
      return (error = {
        message: "telephone has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "telephone is required!" });
  }

  if (typeof mobile_phone !== "undefined" && !mobile_phone) {
    if (mobile_phone.length > 50) {
      return (error = {
        message: "mobile_phone has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "mobile_phone is required!" });
  }

  if (typeof picture_url !== "undefined" && !picture_url) {
    if (picture_url.length > 255) {
      return (error = {
        message: "picture_url has exceeded maximum character length of 255!",
      });
    }
    return (error = { message: "picture_url is required!" });
  }

  if (typeof picture_size !== "undefined" && !picture_size) {
    if (picture_size.length > 100) {
      return (error = {
        message: "picture_size has exceeded maximum character length of 100!",
      });
    }
    return (error = { message: "picture_size is required!" });
  }

  if (typeof picture_type !== "undefined" && !picture_type) {
    if (picture_type.length > 100) {
      return (error = {
        message: "picture_type has exceeded maximum character length of 100!",
      });
    }
    return (error = { message: "picture_type is required!" });
  }

  if (typeof postal_address !== "undefined" && !postal_address) {
    if (postal_address.length > 500) {
      return (error = {
        message: "postal_address has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "postal_address is required!" });
  }

  if (typeof curricular_activities !== "undefined" && !curricular_activities) {
    if (curricular_activities.length > 500) {
      return (error = {
        message:
          "curricular_activities has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "curricular_activities is required!" });
  }

  if (typeof application_number !== "undefined" && !application_number) {
    if (application_number.length > 100) {
      return (error = {
        message:
          "application_number has exceeded maximum character length of 100!",
      });
    }
    return (error = { message: "application_number is required!" });
  }

  if (
    typeof next_of_kin_relationship !== "undefined" &&
    !next_of_kin_relationship
  ) {
    if (next_of_kin_relationship.length > 50) {
      return (error = {
        message:
          "next_of_kin_relationship has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "next_of_kin_relationship is required!" });
  }

  if (typeof next_of_kin_address !== "undefined" && !next_of_kin_address) {
    if (next_of_kin_address.length > 50) {
      return (error = {
        message:
          "next_of_kin_address has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "next_of_kin_address is required!" });
  }

  if (typeof next_of_kin_telephone !== "undefined" && !next_of_kin_telephone) {
    if (next_of_kin_telephone.length > 50) {
      return (error = {
        message:
          "next_of_kin_telephone has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "next_of_kin_telephone is required!" });
  }

  if (typeof next_of_kin_name !== "undefined" && !next_of_kin_name) {
    if (next_of_kin_name.length > 50) {
      return (error = {
        message:
          "next_of_kin_name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "next_of_kin_name is required!" });
  }

  if (typeof permanent_address !== "undefined" && !permanent_address) {
    if (permanent_address.length > 500) {
      return (error = {
        message:
          "permanent_address has exceeded maximum character length of 500!",
      });
    }
    return (error = { message: "permanent_address is required!" });
  }

  if (typeof gender_id !== "undefined" && !Number.isInteger(gender_id)) {
    return (error = { message: "gender_id is invalid/missing!" });
  }

  if (typeof religion_id !== "undefined" && !Number.isInteger(religion_id)) {
    return (error = { message: "religion_id is invalid/missing!" });
  }

  if (typeof date_of_birth !== "undefined" && !date_of_birth) {
    if (date_of_birth.length > 50) {
      return (error = {
        message: "date_of_birth has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "date_of_birth is required!" });
  }

  if (typeof maiden_name !== "undefined" && !maiden_name) {
    if (maiden_name.length > 50) {
      return (error = {
        message: "maiden_name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "maiden_name is required!" });
  }

  if (typeof user_id !== "undefined" && !Number.isInteger(user_id)) {
    return (error = { message: "user_id is invalid/missing!" });
  }

  if (typeof registration_number !== "undefined" && !registration_number) {
    if (registration_number.length > 50) {
      return (error = {
        message:
          "registration_number has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "registration_number is required!" });
  }

  if (typeof id !== "undefined" && !Number.isInteger(id)) {
    return (error = { message: "id is invalid/missing!" });
  }

  if (
    typeof mode_of_admission_id !== "undefined" &&
    !Number.isInteger(mode_of_admission_id)
  ) {
    return (error = { message: "mode_of_admission_id is invalid/missing!" });
  }

  if (
    typeof application_type_id !== "undefined" &&
    !Number.isInteger(application_type_id)
  ) {
    return (error = { message: "application_type_id is invalid/missing!" });
  }

  if (
    typeof academic_session_id !== "undefined" &&
    !Number.isInteger(academic_session_id)
  ) {
    return (error = { message: "academic_session_id is invalid/missing!" });
  }

  if (typeof other_names !== "undefined" && !other_names) {
    if (other_names.length > 50) {
      return (error = {
        message: "other_names has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "other_names is required!" });
  }

  if (typeof last_name !== "undefined" && !last_name) {
    if (last_name.length > 50) {
      return (error = {
        message: "last_name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "last_name is required!" });
  }

  if (typeof email !== "undefined" && !email) {
    return (error = { message: "email is required!" });
  } else if (email) {
    if (email.length > 50) {
      return (error = {
        message: "email has exceeded maximum character length of 50!",
      });
    }
    let validate_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validate_email.test(String(email).toLowerCase())) {
      return (error = { message: "invalid email format!" });
    }
  }

  if (typeof first_name !== "undefined" && !first_name) {
    if (first_name.length > 50) {
      return (error = {
        message: "first_name has exceeded maximum character length of 50!",
      });
    }
    return (error = { message: "first_name is required!" });
  }
};

// create (this is a POST method)
const createApplication = (data, callBack) => {
  if (
    !data.first_name &&
    !data.last_name &&
    !data.mode_of_admission_id &&
    !data.email &&
    !data.application_type_id &&
    !data.academic_session_id
  ) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //insert into the database
  pool.query(
    `insert into applications(
      first_name,
      last_name,
      mode_of_admission_id,
      application_type_id,
      academic_session_id,
      email,
      other_names,
      application_status,
      registration_number,
      user_id,
      maiden_name,
      date_of_birth,
      gender_id,
      religion_id,
      permanent_address,
      next_of_kin_name,
      next_of_kin_relationship,
      next_of_kin_address,
      next_of_kin_telephone,
      disability,
      telephone,
      mobile_phone,
      picture_url,
      picture_size,
      picture_type,
      postal_address,
      curricular_activities,
      application_number,
      date_submitted,
      admission_status,
      terms_agreed,
      attested,
      administrative_message,
      submitted,
      full_time,
      other_disability,
      last_updated,
      attester_name,
      attester_address,
      attester_profession,
      attester_phone,
      attester_position,
      current_addressof_place_of_work,
      permanent_home_address,
      home_town,
      contact_address_bw_now_and_sept,
      is_currently_in_educational_institution,
      name_of_current_institution,
      course_currently_doing,
      means_of_sponsorship,
      is_on_scholarship,
      name_of_scholarship_donor,
      number_of_children,
      proposed_profession_on_completion,
      application_payment_id,
      marital_status_id,
      nationality_id,
      state_of_origin_id,
      lga_id,
      nysc_year,
      nysc_location,
      sponsor_address,
      country_of_residence,
      religious_denomination_id,
      offline_applicant,
      misc1,
      misc2,
      misc3,
      misc4,
      created)
        values(
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?)`,
    [
      data.first_name,
      data.last_name,
      data.mode_of_admission_id,
      data.application_type_id,
      data.academic_session_id,
      data.email,
      data.other_names || null,
      data.application_status || 0,
      data.registration_number || null,
      data.user_id,
      data.maiden_name || null,
      data.date_of_birth || null,
      data.gender_id,
      data.religion_id,
      data.permanent_address || null,
      data.next_of_kin_name || null,
      data.next_of_kin_relationship || null,
      data.next_of_kin_address || null,
      data.next_of_kin_telephone || null,
      data.disability || null,
      data.telephone || null,
      data.mobile_phone || null,
      data.picture_url || null,
      data.picture_size || null,
      data.picture_type || null,
      data.postal_address || null,
      data.curricular_activities || null,
      data.application_number || null,
      data.date_submitted,
      data.admission_status || 0,
      data.terms_agreed || 0,
      data.attested || 0,
      data.administrative_message || null,
      data.submitted || 0,
      data.full_time || 0,
      data.other_disability || null,
      data.last_updated || null,
      data.attester_name || null,
      data.attester_address || null,
      data.attester_profession || null,
      data.attester_phone || null,
      data.attester_position || null,
      data.current_addressof_place_of_work || null,
      data.permanent_home_address || null,
      data.home_town || null,
      data.contact_address_bw_now_and_sept || null,
      data.is_currently_in_educational_institution || 0,
      data.name_of_current_institution || null,
      data.course_currently_doing || null,
      data.means_of_sponsorship || null,
      data.is_on_scholarship || 0,
      data.name_of_scholarship_donor || null,
      data.number_of_children,
      data.proposed_profession_on_completion || null,
      data.application_payment_id,
      data.marital_status_id,
      data.nationality_id,
      data.state_of_origin_id,
      data.lga_id,
      data.nysc_year || null,
      data.nysc_location || null,
      data.sponsor_address || null,
      data.country_of_residence || null,
      data.religious_denomination_id,
      data.offline_applicant || 0,
      data.misc1 || null,
      data.misc2 || null,
      data.misc3 || null,
      data.misc4 || null,
      dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
    ],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, {
        message: "Records created successfully!",
        data: { id: results.insertId },
      });
    }
  );
};

// finddepartments (this is a GET request)
const findApplications = (callBack) => {
  //query the database
  pool.query(`select * from application`, [], (error, results, fields) => {
    if (error) {
      return callBack(error);
    }
    if (results.length < 1) {
      return callBack(null, { message: "No record Found!" });
    } else {
      return callBack(null, results);
    }
  });
};

const findOne = (id, callBack) => {
  const data = { id: id };
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `select * from applications where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack(null, { message: "Record not found!" });
      } else {
        return callBack(null, results);
      }
    }
  );
};

const deleteOne = (data, callBack) => {
  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }

  //query the database
  pool.query(
    `delete from applications where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.affectedRows) {
        return callBack(null, { message: "Record deleted successfully!" });
      } else {
        return callBack(null, { message: "Record not found!" });
      }
    }
  );
};

const updateApplication = (data, callBack) => {
  if (!data.id || data.length < 2) {
    return callBack({ message: "incomplete params" });
  }

  //validate the data
  const validate = validation(data);
  if (typeof validate === "object" && validate !== null) {
    return callBack(validate);
  }
  let query = "";
  let params = [];
  const id = data.id;
  delete data.id; // delete id so the query won't try to update it
  Object.entries(data).forEach(([key, value]) => {
    query += ` ${key}=?,`;
    params.push(value);
  });

  params.push(dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")); //add modified datetime
  params.push(id);
  //insert into the database
  pool.query(
    `update applications set ${query} modified=? where id=?`,
    params,
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.affectedRows) {
        return callBack(null, { message: "Record updated successfully!" });
      } else {
        return callBack(null, { message: "Record not found!" });
      }
    }
  );
};

const viewList = (callBack) => {
  pool.query(
    `select id, first_name, last_name, other_names from applications`,
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length < 1) {
        return callBack(null, { message: "No record Found!" });
      } else {
        return callBack(null, results);
      }
    }
  );
};

module.exports = {
  create: createApplication,
  findAll: findApplications,
  viewList: viewList,
  update: updateApplication,
  findOne: findOne,
  deleteOne: deleteOne,
};
